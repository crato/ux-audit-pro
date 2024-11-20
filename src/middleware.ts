import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.has('appSession');

  // Protected routes
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  // Auth routes that should always be accessible
  const authRoutes = ['/api/auth/login', '/api/auth/callback', '/api/auth/logout'];
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  // Allow all auth routes
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/:path*'
  ]
};