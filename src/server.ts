import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Proxy route for private Vercel Blob images.
// The blob store is private-only, so images are uploaded as private blobs
// and served here using SDK auth. URLs are cached for a year by the browser.
async function handleImageProxy(reqUrl: URL): Promise<Response> {
  const blobUrl = reqUrl.searchParams.get("url") ?? "";
  if (!blobUrl.match(/^https:\/\/[^/]+\.blob\.vercel-storage\.com\//)) {
    return new Response("Forbidden", { status: 403 });
  }
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(blobUrl, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return new Response("Not Found", { status: 404 });
    }
    const iter = result.stream as AsyncIterable<Uint8Array>;
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of iter) controller.enqueue(chunk);
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });
    return new Response(body, {
      headers: {
        "content-type": result.contentType || "image/jpeg",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("[img-proxy]", err);
    return new Response("Error", { status: 500 });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    if (url.pathname === "/api/img") {
      return handleImageProxy(url);
    }
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
