import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
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
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}