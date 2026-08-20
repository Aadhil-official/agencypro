import { createAuthMiddleware } from 'cosmic-authentication';

export const middleware = createAuthMiddleware({
  protectedRoutes: [
    '/admin',
    '/admin/dashboard',
    '/admin/ads',
    '/admin/advertisements',
    '/admin/requests',
    '/admin/users',
  ]
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api/|favicon.ico|admin/signup).*)',
  ]
};