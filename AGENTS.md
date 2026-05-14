# Gloom Routers Website Repo Guardrails

This is the public static website/deploy repo.

It owns:

- landing page
- `/cards`
- custom domain `CNAME`
- tracked `/play/` deploy output

It does not own canonical game source. Canonical game source lives in:

`..\gloom-routers`

## `/play/` Is Generated Output

`/play/` is generated/copied output from:

`..\gloom-routers\dist`

Do not hand-edit `/play/` for normal game behavior fixes.

For game bugs:

1. Edit `..\gloom-routers`.
2. Run the game checks there.
3. Run `npm run build` there.
4. Copy `..\gloom-routers\dist` into this repo's `play` folder.
5. Test `/play/` from this website repo.

Emergency direct website fixes are allowed only for static website issues, not normal game logic.

## Website Checkout Mismatch Warning

The 2026-05-14 audit found a website checkout mismatch:

- top-level `gloomrouters-website` was at `4222b02`
- temp upload clone `.codex-run\gloomrouters-website-upload` was at `9fdfbcf`

Current local preflight may show newer commits, but the safety rule remains: before pushing this repo, verify it is current and not behind/mismatched. Human confirmation required if local history differs from expected remote or any temp upload clone.

## Recommended Static Test

From this repo:

```powershell
py -m http.server 8000
```

Open:

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/cards/`
- `http://127.0.0.1:8000/play/`

## Push Safety

Before any push from this repo:

```powershell
git status --short --branch
git remote -v
git log --oneline -n 5
```

Commit this repo for landing page, `/cards`, `CNAME`, static website assets, and copied `/play/` deploy output.

Do not commit canonical game source here. Do not push until checkout currentness is verified.

Read `..\AGENTS.md` before cross-repo deploy work.
