#!/usr/bin/env python3
"""Compose the maintenance agent's prompt from the rotating checklist,
cursor state, and recent merge/reject history.

Input allowlist by construction: only owner-edited checklist.yaml,
the bot-maintained cursor, and owner-authored outcome records reach the
prompt. Issues, third-party PRs, and visitor input never do.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

PROMPT_TEMPLATE = """You are the scheduled maintenance agent for this portfolio site.

## Your single task this run

{task}

## Hard rules

- Open exactly ONE pull request from a branch named agent/<short-slug>.
- Change at most 5 files.
- The PR body MUST explain: what you found, why this specific change, and how to verify it. The PR body is publicly displayed on the site's /agent page — write it well.
- Never touch narrative copy (about/projects hero text) beyond typo fixes.
- Never modify .github/workflows, checklist.yaml, or data/.
- Design system: Apple-derived tokens in src/app/globals.css. Single action color #0066cc. No new colors, no decorative shadows.

## Recent owner decisions on your past proposals (learn from these)

{history}
"""


def parse_checklist(path: Path) -> list[dict]:
    """Minimal YAML-subset parser for checklist.yaml (stdlib only)."""
    items: list[dict] = []
    current: dict | None = None
    for line in path.read_text(encoding="utf-8").splitlines():
        m_id = re.match(r"\s*-\s*id:\s*(\S+)", line)
        m_task = re.match(r"\s*task:\s*\"(.+)\"", line)
        if m_id:
            current = {"id": m_id.group(1)}
            items.append(current)
        elif m_task and current is not None:
            current["task"] = m_task.group(1)
    return [i for i in items if "task" in i]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--checklist", required=True, type=Path)
    ap.add_argument("--state", required=True, type=Path)
    ap.add_argument("--history", required=True, type=Path)
    ap.add_argument("--out", required=True, type=Path)
    args = ap.parse_args()

    items = parse_checklist(args.checklist)
    if not items:
        raise SystemExit("checklist.yaml parsed to zero items")

    state = json.loads(args.state.read_text(encoding="utf-8"))
    cursor = int(state.get("cursor", 0)) % len(items)
    item = items[cursor]

    lines: list[str] = []
    for raw in args.history.read_text(encoding="utf-8").splitlines():
        try:
            o = json.loads(raw)
        except json.JSONDecodeError:
            continue
        lines.append(
            f"- PR #{o.get('pr')}: {o.get('outcome')} — {o.get('reason', 'no reason recorded')}"
        )
    history = "\n".join(lines) if lines else "(no history yet — this may be your first run)"

    prompt = PROMPT_TEMPLATE.format(task=f"[{item['id']}] {item['task']}", history=history)
    args.out.write_text(prompt, encoding="utf-8")
    print(f"composed prompt for checklist item '{item['id']}' (cursor {cursor})")


if __name__ == "__main__":
    main()
