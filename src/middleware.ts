import { NextRequest, NextResponse } from "next/server";

/**
 * HTTP Basic Auth gate for /admin/*.
 *
 * Why middleware (and not next-auth) for v1:
 *   - Zero deps, runs at the edge before any admin page renders.
 *   - The /admin UI is for a single internal operator; full session
 *     management is overkill until we onboard teammates.
 *
 * Configuration (set in Netlify → Site settings → Environment):
 *   ADMIN_USER       Username                           (default: "admin")
 *   ADMIN_PASSWORD   Password                           (default: "gramfleet-2026")
 *
 * The default password is committed on purpose so the dev environment
 * works out of the box. PRODUCTION MUST OVERRIDE IT via env vars.
 * See `.env.example` for the template.
 */

const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "gramfleet-2026";

export function middleware(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || DEFAULT_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

  const header = req.headers.get("authorization");
  if (header && isValid(header, expectedUser, expectedPassword)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      // The realm string is what the browser shows in the credentials prompt.
      "WWW-Authenticate": 'Basic realm="GramFleet Admin", charset="UTF-8"',
      // Don't let the 401 page get cached by an intermediary.
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Constant-time-ish credential check.
 *
 * `atob` is available in the Edge runtime. We decode the base64 blob,
 * split on the *first* colon only (passwords may legally contain `:`),
 * and compare each half. We bail early on the wrong format so a
 * malformed header can't crash the request.
 */
function isValid(header: string, user: string, password: string): boolean {
  if (!header.toLowerCase().startsWith("basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice("basic ".length).trim());
  } catch {
    return false;
  }

  const colon = decoded.indexOf(":");
  if (colon === -1) return false;

  const providedUser = decoded.slice(0, colon);
  const providedPassword = decoded.slice(colon + 1);

  return providedUser === user && providedPassword === password;
}

export const config = {
  matcher: ["/admin/:path*"],
};
