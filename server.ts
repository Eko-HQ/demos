import { extname, resolve, sep } from "node:path";

const projectName = process.argv[2];
const projectNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

if (!projectName || !projectNamePattern.test(projectName)) {
  throw new Error("Pass a lowercase kebab-case project name, for example: bun run server.ts arison");
}

const projectRoot = resolve(import.meta.dir, projectName);
const port = Number(process.env.DEMOS_PORT ?? "4173");

if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error("DEMOS_PORT must be an integer between 1 and 65535.");
}

async function serveFile(pathname: string) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath === "/" ? "index.html" : `.${decodedPath}`;
  const candidate = resolve(projectRoot, relativePath);

  if (candidate !== projectRoot && !candidate.startsWith(`${projectRoot}${sep}`)) {
    return new Response("Forbidden", { status: 403 });
  }

  const file = Bun.file(candidate);

  if (await file.exists()) {
    return new Response(file);
  }

  if (!extname(candidate)) {
    const indexFile = Bun.file(resolve(candidate, "index.html"));

    if (await indexFile.exists()) {
      return new Response(indexFile);
    }
  }

  return new Response("Not found", { status: 404 });
}

const server = Bun.serve({
  port,
  fetch(request) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    return serveFile(url.pathname);
  },
});

console.log(`Serving ${projectName} at ${server.url}`);
