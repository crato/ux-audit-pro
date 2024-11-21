import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 pl-64">
        {/* Header */}
        <Header />

          {/* Breadcrumb */}
          <Breadcrumbs />

          {/* Page content */}
          <main className="px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}