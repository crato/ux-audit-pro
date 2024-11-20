import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import ClientLayout from '@/components/layout/client-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'UX Audit Pro',
  description: 'Professional UX Audit Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          <div className="min-h-screen bg-gray-50">
            <Header />
            {children}
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}