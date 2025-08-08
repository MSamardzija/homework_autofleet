'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, hasMounted]);

  if (!hasMounted || loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-xl font-semibold'>Učitavanje...</div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
