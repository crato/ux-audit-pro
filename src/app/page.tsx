import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  // Check for authentication cookie
  const isAuthenticated = cookies().has('appSession');

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-12 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              UX Audit Pro
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Professional UX audit management platform
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/api/auth/login"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}