import { Vehicle } from '@/types/globals';

// Dummy data
let vehicles: Vehicle[] = [
  { id: 1, brand: 'Audi', model: 'A4', year: 2018 },
  { id: 2, brand: 'BMW', model: '320', year: 2020 },
];

let nextId = 3;

export const vehicleAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    await new Promise((res) => setTimeout(res, 300));
    return [...vehicles];
  },

  add: async (data: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const newVehicle = { ...data, id: nextId++ };
    vehicles.push(newVehicle);
    return newVehicle;
  },

  update: async (id: number, data: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    vehicles = vehicles.map((v) => (v.id === id ? { ...data, id } : v));
    return { ...data, id };
  },

  remove: async (id: number): Promise<void> => {
    vehicles = vehicles.filter((v) => v.id !== id);
  },
};
