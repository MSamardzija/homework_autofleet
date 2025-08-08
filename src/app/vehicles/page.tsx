'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPublicVehicles } from '@/lib/api/publicCars';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Header from '@/components/Header';

const ITEMS_PER_PAGE = 12;

export default function Page() {
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchPublicVehicles,
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const brand = searchParams.get('brand')?.toLowerCase() || '';
  const year = searchParams.get('year') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      const matchesBrand = v.brand.toLowerCase().includes(brand);
      const matchesYear = year ? v.year.toString() === year : true;
      return matchesBrand && matchesYear;
    });
  }, [vehicles, brand, year]);

  const paginatedVehicles = filteredVehicles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const brand = formData.get('brand')?.toString() || '';
    const year = formData.get('year')?.toString() || '';
    router.push(`/vehicles?brand=${brand}&year=${year}&page=1`);
  };

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900'>
      <Header />

      {isLoading ? (
        <p className='p-8'>Učitavanje...</p>
      ) : (
        <div className='flex-grow max-w-6xl mx-auto px-4 py-10 w-full flex flex-col'>
          <h1 className='text-3xl font-bold text-blue-800 mb-8'>
            Lista Javnih Vozila
          </h1>

          {/* Filter forma */}
          <form
            onSubmit={handleSearch}
            className='flex flex-col sm:flex-row sm:items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm'
          >
            <input
              name='brand'
              placeholder='Pretraga po marki...'
              className='input w-full sm:w-60'
              defaultValue={brand}
            />
            <input
              name='year'
              placeholder='Godina'
              className='input w-full sm:w-40'
              defaultValue={year}
            />
            <button
              type='submit'
              className='w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition font-bold'
            >
              Pretraži
            </button>
          </form>

          {/* Grid */}
          <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginatedVehicles.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                Nema rezultata.
              </p>
            ) : (
              paginatedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition'
                >
                  <h2 className='text-lg font-semibold text-gray-800'>
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <p className='text-gray-500'>Godina: {vehicle.year}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Paginacija */}
      {!isLoading && totalPages > 1 && (
        <div className='mt-auto py-6 flex justify-center gap-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() =>
                router.push(`/vehicles?brand=${brand}&year=${year}&page=${p}`)
              }
              className={`px-3 py-1 rounded border text-sm font-medium transition ${
                p === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
