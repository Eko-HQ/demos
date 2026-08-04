# Eko Client Integration Demos

This repository hosts temporary, client-approved previews showing how the Eko chatbox looks on client homepages.

Each client has one lowercase kebab-case folder. The folder name, root Bun script, and public URL path must match:

```text
Folder:      <project-name>/
Local:       bun run <project-name>
Public URL:  https://eko-hq.github.io/demos/<project-name>/
```

Run an integration locally from the repository root:

```bash
bun run arison
```

The command prints the local URL. GitHub Pages deploys the complete static repository whenever `main` is pushed.

## Adding an integration

Follow `workflows/integrate_demo.md` from the containing Eko workspace. Add the client folder and one matching script in `package.json`. Keep all client-specific files inside that folder, use subpath-safe relative asset URLs, and preserve every existing integration.

The shared Pages workflow is repository infrastructure. Do not create a separate repository or deployment for a client.
