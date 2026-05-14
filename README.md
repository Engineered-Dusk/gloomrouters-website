# Gloom Routers Website

This repository contains the public website for **Gloom Routers** (not the playable game client).

## Workspace / Deployment Guardrail

This is the public static website repo. `/play/` is generated deploy output
copied from the game source repo at `..\gloom-routers\dist`.

Do not hand-edit `/play/` for normal game fixes. Fix the game in
`..\gloom-routers`, rebuild there, then copy the generated output into `play`.
Read `AGENTS.md` before website or `/play/` work.

Before pushing, verify this checkout is current. A 2026-05-14 audit found a
previous mismatch with a newer temp upload clone.

## Version 0 scope
- Static single-page landing site using plain HTML/CSS/vanilla JavaScript.
- No framework, no backend, no analytics/tracking, and no build pipeline.

## Files
- `index.html`: main landing page content and section structure, including the retro intro overlay sequence.
- `styles.css`: page styling, responsive layout, and intro overlay visuals.
- `cards/`: static rendered card browser.
- `play/`: tracked generated game deploy output copied from the game source repo.
- `assets/cards/`: selected card images for display.
- `assets/`: includes existing title-art PNGs used directly by the intro sequence.
- `CNAME`: custom domain for GitHub Pages (`gloomrouters.com`).

## Local preview
Open `index.html` directly in a browser.

## GitHub Pages
The site is expected to deploy from this repository as a static site (serving `index.html` at the project root).
