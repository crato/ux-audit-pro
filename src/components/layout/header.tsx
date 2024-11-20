import Link from 'next/link';
import { cookies } from 'next/headers';
import ProfileButton from './profile-button';

export default function Header() {
  const isAuthenticated = cookies().has('appSession');

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Left section */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                UX Audit Pro
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <ProfileButton />
              </div>
            ) : (
              <Link
                href="/api/auth/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}