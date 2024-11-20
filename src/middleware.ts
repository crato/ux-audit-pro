import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Protected routes - add your protected routes here
  const protectedRoutes = ['/dashboard']

  // Check if the path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) => 
    path.startsWith(route)
  )

  if (isProtectedRoute) {
    // Get the token from the session cookie
    const token = request.cookies.get('appSession')

    // If there's no token, redirect to the login page
    if (!token) {
      const response = NextResponse.redirect(
        new URL('/api/auth/login', request.url)
      )
      return response
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
}