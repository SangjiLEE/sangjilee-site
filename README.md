# sangjilee-site

A portfolio site that maintains itself — the governance loop is the exhibit.

- **Live data**: `scripts/collect.py` (Python, stdlib-only, typed, tested,
  retries) refreshes GitHub activity, Multifolios status, and certifications
  nightly. CI commits results to the **`data` branch** so the protected
  `main` history stays human-only.
- **Maintenance agent**: a scheduled Claude agent
  (`.github/workflows/agent.yml`, twice weekly) picks ONE item from the
  rotating [checklist.yaml](checklist.yaml) and opens a PR with written
  reasoning. It cannot deploy — `main` is branch-protected, a human merges.
- **Observability**: the [/agent](src/app/agent/page.tsx) page renders every
  agent PR (merged / rejected / open) — the PR bodies are the portfolio.
- **Loop engineering**: Observe (signals) → Decide (checklist cursor) →
  Act (PR + reasoning) → Gate (human merge) → Verify (CI) → Learn
  (outcomes history fed back into the next prompt, M2).

## Design

Apple-derived tokens (`src/app/globals.css`) via
[awesome-design-md](https://github.com/VoltAgent/awesome-design-md):
white / `#f5f5f7` / dark-tile surface rhythm, single action color `#0066cc`,
system font stack. Language adopted, identity not copied.

## Development

```bash
npm run dev            # local dev
npm run build          # production build
python3 -m pytest scripts/ -q   # collector tests
python3 scripts/collect.py      # refresh data/*.json locally
```

## Setup checklist (one-time)

1. Create GitHub repo, push `main`, create `data` branch from `main`.
2. Branch-protect `main` (require PR + 1 approval; no direct pushes).
3. Repo secrets: `ANTHROPIC_API_KEY` (usage-capped key).
4. Vercel: import repo, set `SITE_REPO` and `DATA_BRANCH_RAW_URL` env vars,
   enable daily scheduled redeploy.
5. Merge the first seed agent PR before sharing the URL.
