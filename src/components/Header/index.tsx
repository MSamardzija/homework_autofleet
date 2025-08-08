'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='w-full px-4 sm:px-6 py-4 bg-white shadow-md flex items-center justify-between'>
      <div className='text-2xl font-bold text-blue-600'>AutoFleet</div>

      {user ? (
        <button
          onClick={logout}
          className='bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition font-semibold'
        >
          Odjavi se
        </button>
      ) : (
        <Link
          href='/login'
          className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-semibold'
        >
          Prijavi se
        </Link>
      )}
    </header>
  );
}
