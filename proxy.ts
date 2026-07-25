import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

const lastModified = new Date(
  process.env.SITE_BUILD_TIME ?? 0,
).toUTCString();

function isPublicPageRequest(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  const pathname = request.nextUrl.pathname;
  const isPublicPage =
    pathname === "/" ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === docsRoute ||
    pathname.startsWith(`${docsRoute}/`);

  if (!isPublicPage) return false;

  const accept = request.headers.get("accept") ?? "";
  const isReactServerComponent =
    request.headers.get("rsc") === "1" || accept.includes("text/x-component");

  return !isReactServerComponent;
}

function withLastModified(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  if (!isPublicPageRequest(request)) return response;

  const ifModifiedSince = request.headers.get("if-modified-since");
  const modifiedSince = ifModifiedSince ? Date.parse(ifModifiedSince) : NaN;
  const resourceModifiedAt = Date.parse(lastModified);

  if (
    Number.isFinite(modifiedSince) &&
    Number.isFinite(resourceModifiedAt) &&
    modifiedSince >= resourceModifiedAt
  ) {
    return new NextResponse(null, {
      status: 304,
      headers: {
        "Last-Modified": lastModified,
      },
    });
  }

  response.headers.set("Last-Modified", lastModified);
  return response;
}

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return withLastModified(
      request,
      NextResponse.rewrite(new URL(result, request.nextUrl)),
    );
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return withLastModified(
        request,
        NextResponse.rewrite(new URL(result, request.nextUrl)),
      );
    }
  }

  return withLastModified(request, NextResponse.next());
}
