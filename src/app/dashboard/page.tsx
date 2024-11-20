import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect('/api/auth/login')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your UX Audit Pro dashboard!</p>
    </div>
  )
}