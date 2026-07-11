"""Unit tests for collect.py (run: python3 -m pytest scripts/ -q)."""

import json
from pathlib import Path
from unittest import mock

import collect


def test_validate_certs_ok(tmp_path: Path, monkeypatch) -> None:
    data = {
        "generated_at": "old",
        "certifications": [{"name": "AI-102", "issued": "2023-09"}],
    }
    (tmp_path / "certs.json").write_text(json.dumps(data), encoding="utf-8")
    monkeypatch.setattr(collect, "DATA_DIR", tmp_path)
    out = collect.validate_certs()
    assert out["certifications"] == data["certifications"]
    assert out["generated_at"] != "old"


def test_validate_certs_rejects_bad_entry(tmp_path: Path, monkeypatch) -> None:
    (tmp_path / "certs.json").write_text(
        json.dumps({"certifications": [{"name": 1}]}), encoding="utf-8"
    )
    monkeypatch.setattr(collect, "DATA_DIR", tmp_path)
    try:
        collect.validate_certs()
        raise AssertionError("expected ValueError")
    except ValueError:
        pass


def test_multifolios_degrades_when_unreachable(monkeypatch) -> None:
    def boom(url: str, token=None):
        raise RuntimeError("unreachable")

    monkeypatch.setattr(collect, "_get_json", boom)
    out = collect.collect_multifolios()
    assert out.available is False
    assert "unreachable" in out.uptime_note


def test_get_json_retries_then_raises(monkeypatch) -> None:
    calls = {"n": 0}

    def fake_urlopen(req, timeout):
        calls["n"] += 1
        raise TimeoutError("slow")

    monkeypatch.setattr(collect, "BACKOFF_SECONDS", 0.0)
    with mock.patch.object(collect.urllib.request, "urlopen", fake_urlopen):
        try:
            collect._get_json("https://example.invalid/x")
            raise AssertionError("expected RuntimeError")
        except RuntimeError:
            pass
    assert calls["n"] == collect.RETRIES
