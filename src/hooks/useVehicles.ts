import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehicleAPI } from '@/lib/api/vehicles';
import { VehicleFormData } from '@/lib/validations/vehicleSchema';

export const useVehicles = () => {
  const queryClient = useQueryClient();

  const vehiclesQuery = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehicleAPI.getAll,
  });

  const addVehicle = useMutation({
    mutationFn: vehicleAPI.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vehicles'] }),
  });

  const updateVehicle = useMutation({
    mutationFn: ({ id, data }: { id: number; data: VehicleFormData }) =>
      vehicleAPI.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vehicles'] }),
  });

  const deleteVehicle = useMutation({
    mutationFn: vehicleAPI.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vehicles'] }),
  });

  return {
    vehiclesQuery,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  };
};
