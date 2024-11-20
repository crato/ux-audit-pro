import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to UX Audit Pro</h1>
      <div className="space-y-4">
        <Link 
          href="/auth/login"
          className="block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
      </div>
    </main>
  )
}