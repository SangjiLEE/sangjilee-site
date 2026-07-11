#!/usr/bin/env python3
"""Nightly data collection for sangjilee-site.

Pulls GitHub activity, Multifolios status, and validates the certifications
list, then writes data/*.json. Committed to the `data` branch by CI so the
protected `main` history stays human-only.

Stdlib only — no pip installs in CI.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from time import sleep

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
GITHUB_USER = os.environ.get("SITE_GITHUB_USER", "SangjiLEE")
MULTIFOLIOS_STATUS_URL = os.environ.get(
    "MULTIFOLIOS_STATUS_URL", "https://multifolios.com/api/status"
)
RETRIES = 3
BACKOFF_SECONDS = 2.0


def _now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _get_json(url: str, token: str | None = None) -> dict | list:
    """GET a JSON document with linear-backoff retries."""
    headers = {"Accept": "application/json", "User-Agent": "sangjilee-site-collect"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    last_error: Exception | None = None
    for attempt in range(1, RETRIES + 1):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as res:
                return json.load(res)
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = exc
            if attempt < RETRIES:
                sleep(BACKOFF_SECONDS * attempt)
    raise RuntimeError(f"GET {url} failed after {RETRIES} attempts: {last_error}")


@dataclass
class GitHubData:
    generated_at: str
    username: str
    public_repos: int
    followers: int
    recent_push_count_30d: int
    top_languages: list[str] = field(default_factory=list)


def collect_github(token: str | None) -> GitHubData:
    user = _get_json(f"https://api.github.com/users/{GITHUB_USER}", token)
    assert isinstance(user, dict)

    events = _get_json(
        f"https://api.github.com/users/{GITHUB_USER}/events/public?per_page=100", token
    )
    assert isinstance(events, list)
    cutoff = datetime.now(timezone.utc).timestamp() - 30 * 86400
    pushes = sum(
        1
        for e in events
        if e.get("type") == "PushEvent"
        and datetime.fromisoformat(e["created_at"].replace("Z", "+00:00")).timestamp()
        > cutoff
    )

    repos = _get_json(
        f"https://api.github.com/users/{GITHUB_USER}/repos?sort=pushed&per_page=20",
        token,
    )
    assert isinstance(repos, list)
    langs: dict[str, int] = {}
    for r in repos:
        lang = r.get("language")
        if lang:
            langs[lang] = langs.get(lang, 0) + 1
    top = sorted(langs, key=langs.get, reverse=True)[:3]  # type: ignore[arg-type]

    return GitHubData(
        generated_at=_now_iso(),
        username=GITHUB_USER,
        public_repos=int(user.get("public_repos", 0)),
        followers=int(user.get("followers", 0)),
        recent_push_count_30d=pushes,
        top_languages=top,
    )


@dataclass
class MultifoliosData:
    generated_at: str
    available: bool
    uptime_note: str = ""
    last_ai_summary_at: str | None = None
    markets: list[str] = field(default_factory=lambda: ["US", "KR", "JP", "Crypto"])


def collect_multifolios() -> MultifoliosData:
    try:
        status = _get_json(MULTIFOLIOS_STATUS_URL)
        assert isinstance(status, dict)
        return MultifoliosData(
            generated_at=_now_iso(),
            available=True,
            uptime_note=str(status.get("uptime_note", "operational")),
            last_ai_summary_at=status.get("last_ai_summary_at"),
            markets=list(status.get("markets", ["US", "KR", "JP", "Crypto"])),
        )
    except RuntimeError:
        # Endpoint not live yet (M1) or transient outage — degrade honestly.
        return MultifoliosData(
            generated_at=_now_iso(),
            available=False,
            uptime_note="status endpoint unreachable",
        )


def validate_certs() -> dict:
    """Certs are owner-edited; collect.py validates the schema and re-stamps."""
    path = DATA_DIR / "certs.json"
    doc = json.loads(path.read_text(encoding="utf-8"))
    certs = doc["certifications"]
    if not isinstance(certs, list) or not certs:
        raise ValueError("certs.json: certifications must be a non-empty list")
    for c in certs:
        if not isinstance(c.get("name"), str) or not isinstance(c.get("issued"), str):
            raise ValueError(f"certs.json: bad entry {c!r}")
    return {"generated_at": _now_iso(), "certifications": certs}


def write_json(name: str, payload: dict) -> None:
    path = DATA_DIR / f"{name}.json"
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"wrote {path.relative_to(DATA_DIR.parent)}")


def main() -> int:
    token = os.environ.get("GITHUB_TOKEN")
    failures: list[str] = []

    try:
        write_json("github", asdict(collect_github(token)))
    except Exception as exc:  # noqa: BLE001 — one source failing must not kill the rest
        failures.append(f"github: {exc}")

    try:
        write_json("multifolios", asdict(collect_multifolios()))
    except Exception as exc:  # noqa: BLE001
        failures.append(f"multifolios: {exc}")

    try:
        write_json("certs", validate_certs())
    except Exception as exc:  # noqa: BLE001
        failures.append(f"certs: {exc}")

    if failures:
        print("FAILURES:\n" + "\n".join(failures), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
