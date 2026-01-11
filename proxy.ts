// proxy.ts
import type { NextRequest } from "next/server";
import { createAuthMiddleware } from "cosmic-authentication";

const auth = createAuthMiddleware({
  protectedRoutes: [
    "/admin",
    "/admin/dashboard",
    "/admin/ads",
    "/admin/advertisements",
    "/admin/requests",
    "/admin/users",
  ],
});

// ✅ Next.js wants a FUNCTION export
export function proxy(request: NextRequest) {
  return auth(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|favicon.ico).*)"],
};
