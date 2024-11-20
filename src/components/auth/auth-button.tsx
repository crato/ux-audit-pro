'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AuthButton() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Button disabled variant="outline">
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {user.email}
        </span>
        <Button variant="outline" asChild>
          <Link href="/api/auth/logout">Logout</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button asChild>
      <Link href="/api/auth/login">Login</Link>
    </Button>
  );
}
