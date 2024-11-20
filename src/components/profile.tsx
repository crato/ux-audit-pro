import { getSession } from '@auth0/nextjs-auth0';

export async function Profile() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <div>
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  );
}