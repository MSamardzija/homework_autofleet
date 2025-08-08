import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceAPI } from '@/lib/api/services';
import { Service } from '@/types/globals';

export const useServices = (vehicleId: number) => {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ['services', vehicleId],
    queryFn: () => serviceAPI.getAll(vehicleId),
  });

  const addService = useMutation({
    mutationFn: (data: Omit<Service, 'id'>) => serviceAPI.add(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['services', vehicleId] }),
  });

  const updateService = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Service, 'id'> }) =>
      serviceAPI.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['services', vehicleId] }),
  });

  const deleteService = useMutation({
    mutationFn: (id: number) => serviceAPI.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['services', vehicleId] }),
  });

  return {
    servicesQuery,
    addService,
    updateService,
    deleteService,
  };
};
