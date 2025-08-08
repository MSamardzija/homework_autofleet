'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  serviceSchema,
  ServiceFormData,
} from '@/lib/validations/serviceSchema';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/types/globals';

type ServicesListProps = {
  vehicleId: number;
};

export default function ServicesList({ vehicleId }: ServicesListProps) {
  const { servicesQuery, addService, updateService, deleteService } =
    useServices(vehicleId);
  const [editingService, setEditingService] = useState<null | { id: number }>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (data: ServiceFormData) => {
    const fullData = { ...data, vehicleId };
    if (editingService) {
      updateService.mutate(
        { id: editingService.id, data: fullData },
        {
          onSuccess: () => {
            reset();
            setEditingService(null);
          },
        }
      );
    } else {
      addService.mutate(fullData, {
        onSuccess: () => reset(),
      });
    }
  };

  const startEdit = (service: Service) => {
    setEditingService({ id: service.id });
    reset({
      date: service.date,
      description: service.description,
      price: service.price,
      type: service.type,
    });
  };

  if (servicesQuery.isLoading) return <p>Učitavanje servisa...</p>;
  if (servicesQuery.isError) return <p>Greška pri učitavanju servisa.</p>;

  return (
    <div className='max-w-3xl mx-auto p-4 bg-white rounded shadow'>
      <h2 className='text-xl font-semibold mb-4'>Dodaj servis</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mb-6'>
        <div>
          <label className='block mb-1 font-medium'>Datum</label>
          <input type='date' {...register('date')} className='input' />
          {errors.date && (
            <p className='text-red-500 text-sm'>{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className='block mb-1 font-medium'>Opis</label>
          <input
            type='text'
            placeholder='Opis servisa'
            {...register('description')}
            className='input'
          />
          {errors.description && (
            <p className='text-red-500 text-sm'>{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className='block mb-1 font-medium'>Cena</label>
          <input
            type='number'
            step='1'
            {...register('price', { valueAsNumber: true })}
            className='input'
          />
          {errors.price && (
            <p className='text-red-500 text-sm'>{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className='block mb-1 font-medium'>Tip servisa</label>
          <select {...register('type')} className='input'>
            <option value='redovni'>Redovni</option>
            <option value='kvar'>Kvar</option>
          </select>
          {errors.type && (
            <p className='text-red-500 text-sm'>{errors.type.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
        >
          {editingService ? 'Izmeni servis' : 'Dodaj servis'}
        </button>
        {editingService && (
          <button
            type='button'
            onClick={() => {
              reset();
              setEditingService(null);
            }}
            className='ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition'
          >
            Otkaži
          </button>
        )}
      </form>

      <div>
        <h3 className='font-semibold mb-2'>Lista servisa:</h3>

        {servicesQuery.data?.length ? (
          <ul className='space-y-4'>
            {servicesQuery.data.map((service) => (
              <li
                key={service.id}
                className='flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded gap-3'
              >
                <div className='flex-1'>
                  <p>Datum: {service.date}</p>
                  <p>Opis: {service.description}</p>
                  <p>Cena: {service.price} RSD</p>
                  <p>Tip servisa: {service.type}</p>
                </div>
                <div className='flex gap-3 sm:flex-row flex-col sm:items-center'>
                  <button
                    onClick={() => startEdit(service)}
                    className='text-blue-600 hover:underline text-left'
                  >
                    Izmeni
                  </button>
                  <button
                    onClick={() => deleteService.mutate(service.id)}
                    className='text-red-600 hover:underline text-left'
                  >
                    Obriši
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500 italic'>Nema servisa za ovo vozilo.</p>
        )}
      </div>
    </div>
  );
}
