import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UX Audit Pro',
  description: 'Professional UX Audit Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}