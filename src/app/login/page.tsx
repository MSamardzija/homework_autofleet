'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Divider from '@/components/Divider';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const schema = z.object({
  username: z.string().min(4, 'Korisnicko ime mora imati najmanje 4 karaktera'),
  password: z.string().min(4, 'Lozinka mora imati najmanje 4 karaktera'),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const { login, user, loading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const success = login(data.username, data.password);

    if (success) {
      setError('');
      router.push('/dashboard');
    } else {
      setError('Pogrešno korisničko ime ili lozinka.');
    }
  };
  return (
    <section
      className='bg-cover bg-center bg-no-repeat h-screen flex items-center px-3'
      style={{ backgroundImage: "url('login-screen-bg.jpg')" }}
    >
      <div className='w-full max-w-md mx-auto py-10 px-8 rounded-3xl bg-white shadow-xl'>
        <h1 className='text-blue-800 font-extrabold text-5xl text-center mb-2 '>
          AutoFleet
        </h1>
        <p className='text-center text-sm uppercase tracking-wider text-gray-600 mb-8 '>
          Pregled servisa na vozilima
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label
              htmlFor='username'
              className='block mb-1 text-sm font-semibold text-gray-700'
            >
              Korisničko ime:
            </label>
            <input
              id='username'
              type='text'
              placeholder='admin'
              {...register('username')}
              className='input'
            />
            {errors.username && (
              <p className='mt-1 text-red-600 text-sm'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-semibold text-gray-700'
            >
              Lozinka:
            </label>
            <input
              id='password'
              type='password'
              placeholder='admin'
              {...register('password')}
              className='input'
            />
            {errors.password && (
              <p className='mt-1 text-red-600 text-sm'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
          hover:bg-blue-700 transition cursor-pointer'
          >
            Prijavi se
          </button>
          {error && (
            <p className='text-red-600 text-sm text-center mt-4'>{error}</p>
          )}
        </form>

        <Divider text='Zanimaju te javna vozila ?' />

        <Link
          href='/vehicles'
          className='mt-8 block text-center bg-red-600 text-white py-3 px-6 rounded-lg
        hover:bg-red-700 transition font-semibold'
        >
          Pogledaj ovde
        </Link>
      </div>
    </section>
  );
}
