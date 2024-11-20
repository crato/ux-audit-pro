'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';

export default function AuthTest() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <div className="space-y-4">
        <p>✅ Auth0 is working!</p>
        <p>Logged in as: {user.email}</p>
        <Button asChild variant="outline">
          <a href="/api/auth/logout">Log out</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p>Not logged in</p>
      <Button asChild>
        <a href="/api/auth/login">Log in</a>
      </Button>
    </div>
  );
}
