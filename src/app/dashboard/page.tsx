'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Page() {
  const { user } = useAuth();

  return (
    <>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>
        Zdravo, {user?.username}
      </h1>
      <p className='text-gray-600 text-lg mb-6'>Dobrodošao nazad !</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Link
          href='/dashboard/vehicles'
          className='bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer'
        >
          <h2 className='text-xl font-semibold text-blue-600'>
            Moja vozila i servisi
          </h2>
          <p className='text-gray-500 text-sm'>
            Pregled i upravljanje vozilima i servisima
          </p>
        </Link>
        <Link
          href='/vehicles'
          className='bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer'
        >
          <h2 className='text-xl font-semibold text-blue-600'>
            Pregled javnih vozila
          </h2>
          <p className='text-gray-500 text-sm'>Sva vozila</p>
        </Link>
      </div>
      {/* <p className='text-red-600 italic mt-6'>
        State for vehicles and services is not being saved after you refresh its
        gone!
      </p> */}
    </>
  );
}
