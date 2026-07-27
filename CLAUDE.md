# Repository Instructions

This repository contains temporary, client-approved Eko homepage integration demos. Every project uses one matching lowercase kebab-case folder, Bun script, and GitHub Pages path.

## Deploy Configuration

- Platform: GitHub Pages through GitHub Actions
- Production URL: `https://eko-hq.github.io/demos/`
- Deploy workflow: `.github/workflows/pages.yml`
- Deploy status command: `gh run list --repo Eko-HQ/demos --workflow pages.yml --branch main`
- Merge method: direct commits to `main` for explicitly requested integrations
- Project type: static website collection
- Post-deploy health check: open the exact client path in a headless browser

### Custom deploy hooks

- Pre-merge: run the matching `bun run <project-name>` command and complete one-pass browser verification
- Deploy trigger: automatic on push to `main`
- Deploy status: watch the Pages workflow to completion
- Health check: verify `https://eko-hq.github.io/demos/<project-name>/`

Never create a separate repository or Pages deployment for an individual client. Preserve unrelated client folders and stage only the files belonging to the requested integration.
