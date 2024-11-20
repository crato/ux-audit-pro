'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">UX Audit Pro</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/api/auth/login"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}