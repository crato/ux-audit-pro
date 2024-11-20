'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';

export default function AuthStatus() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome {user.email}</span>
        <Button variant="outline" asChild>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      </div>
    );
  }

  return (
    <Button asChild>
      <a href="/api/auth/login">Login</a>
    </Button>
  );
}