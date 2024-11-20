import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.has('appSession');

  // Protected routes
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  // Auth routes
  const authRoutes = ['/api/auth/login', '/api/auth/logout', '/api/auth/callback'];
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  // If it's a protected path and user is not authenticated
  if (isProtectedPath && !isAuthenticated) {
    const redirectUrl = new URL('/api/auth/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access auth routes (except logout)
  if (isAuthenticated && isAuthRoute && !path.startsWith('/api/auth/logout')) {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/auth/:path*'
  ]
};