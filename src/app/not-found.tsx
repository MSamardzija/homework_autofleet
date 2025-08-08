import Header from '@/components/Header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className='min-h-screen flex flex-col items-center justify-center text-center space-y-4'>
        <h2 className='text-2xl font-semibold'>Error 404 !</h2>
        <p className='text-gray-600'>Stranica Nije Pronadjena</p>
        <Link
          href='/dashboard'
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
        >
          Vrati se
        </Link>
      </div>
    </>
  );
}
