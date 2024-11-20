'use client'

import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Header() {
  const { user, isLoading } = useUser()

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">UX Audit Pro</span>
            </Link>
          </div>
          <div className="flex items-center">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{user.email}</span>
                    <Link
                      href="/api/auth/logout"
                      className="text-sm text-gray-700 hover:text-gray-900"
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="/api/auth/login"
                    className="text-sm text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}