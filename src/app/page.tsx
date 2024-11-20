import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const isAuthenticated = cookies().has('appSession');

  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">UX Audit Pro</h1>
          <p className="mt-2 text-gray-600">Professional UX audit management platform</p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/api/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in to get started
          </Link>
        </div>
      </div>
    </div>
  );
}