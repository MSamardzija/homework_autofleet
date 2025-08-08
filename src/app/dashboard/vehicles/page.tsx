'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVehicles } from '@/hooks/useVehicles';
import {
  vehicleSchema,
  VehicleFormData,
} from '@/lib/validations/vehicleSchema';
import { useState } from 'react';
import { Vehicle } from '@/types/globals';
import ServicesList from '@/components/ServicesList';

export default function Page() {
  const { vehiclesQuery, addVehicle, updateVehicle, deleteVehicle } =
    useVehicles();

  const [editingVehicle, setEditingVehicle] = useState<null | { id: number }>(
    null
  );

  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = (data: VehicleFormData) => {
    try {
      if (editingVehicle) {
        updateVehicle.mutate(
          { id: editingVehicle.id, data },
          {
            onSuccess: () => {
              reset();
              setEditingVehicle(null);
            },
          }
        );
      } else {
        addVehicle.mutate(data, {
          onSuccess: () => {
            reset();
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (v: Vehicle) => {
    setEditingVehicle({ id: v.id });
    reset({ brand: v.brand, model: v.model, year: v.year });
  };

  const handleDelete = (id: number) => {
    deleteVehicle.mutate(id, {
      onSuccess: () => {
        if (editingVehicle?.id === id) {
          setEditingVehicle(null);
          reset();
        }
        if (selectedVehicleId === id) {
          setSelectedVehicleId(null);
        }
      },
    });
  };

  const toggleServices = (id: number) => {
    setSelectedVehicleId((current) => (current === id ? null : id));
  };

  if (vehiclesQuery.isLoading) return <p>Učitavanje...</p>;

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Leva strana - forma */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white p-4 rounded shadow w-full md:w-1/3 space-y-4 h-fit'
        >
          <h2 className='text-2xl font-bold mb-4'>Unesi vozilo</h2>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='w-full sm:w-1/2'>
              <input
                placeholder='Marka'
                {...register('brand')}
                className='input w-full'
              />
              {errors.brand && (
                <p className='text-red-500 text-sm'>{errors.brand.message}</p>
              )}
            </div>
            <div className='w-full sm:w-1/2'>
              <input
                placeholder='Model'
                {...register('model')}
                className='input w-full'
              />
              {errors.model && (
                <p className='text-red-500 text-sm'>{errors.model.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              placeholder='Godina'
              {...register('year')}
              className='input w-full'
            />
            {errors.year && (
              <p className='text-red-500 text-sm'>{errors.year.message}</p>
            )}
          </div>

          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full'
          >
            {editingVehicle ? 'Izmeni vozilo' : 'Dodaj vozilo'}
          </button>
        </form>

        {/* Desna strana - lista */}
        <div className='w-full md:w-2/3 space-y-4'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Lista vozila</h2>
          {vehiclesQuery.data?.map((v) => (
            <div
              key={v.id}
              className='p-4 bg-white rounded shadow-sm flex flex-col gap-2'
            >
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3'>
                <div>
                  <p className='font-semibold'>
                    {v.brand} {v.model}
                  </p>
                  <p className='text-sm text-gray-500'>{v.year}</p>
                </div>

                <div className='flex flex-row gap-2'>
                  <button
                    onClick={() => handleEdit(v)}
                    className='text-blue-600 hover:underline text-left'
                  >
                    Izmeni
                  </button>

                  <button
                    onClick={() => toggleServices(v.id)}
                    className='text-green-600 hover:underline text-left'
                  >
                    {selectedVehicleId === v.id
                      ? 'Sakrij servise'
                      : 'Vidi servise'}
                  </button>

                  <button
                    onClick={() => handleDelete(v.id)}
                    className='text-red-600 hover:underline text-left'
                  >
                    Obriši
                  </button>
                </div>
              </div>

              {selectedVehicleId === v.id && (
                <div className='mt-2'>
                  <ServicesList vehicleId={v.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
