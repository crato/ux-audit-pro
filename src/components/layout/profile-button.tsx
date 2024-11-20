'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';

export default function ProfileButton() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="relative ml-3">
      <button
        type="button"
        className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-500" />
        </div>
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <Link
            href="/api/auth/logout"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}