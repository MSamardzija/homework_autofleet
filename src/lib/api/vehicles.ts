import { Vehicle } from '@/types/globals';
import { serviceAPI } from './services';

const STORAGE_KEY = 'vehicles';

const defaultVehicles: Vehicle[] = [
  { id: 1, brand: 'Audi', model: 'A4', year: 2018 },
  { id: 2, brand: 'BMW', model: '320', year: 2020 },
];

function loadVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    // Ako je prazno ubaci defaultne
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultVehicles));
    return defaultVehicles;
  }
}

function saveVehicles(vehicles: Vehicle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

let nextId = 3;

export const vehicleAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    await new Promise((res) => setTimeout(res, 300));
    const vehicles = loadVehicles();
    // Update nextId u slučaju da je lista promenjena
    nextId =
      vehicles.reduce((maxId, v) => (v.id > maxId ? v.id : maxId), 0) + 1;
    return vehicles;
  },

  add: async (data: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const vehicles = loadVehicles();
    const newVehicle = { ...data, id: nextId++ };
    vehicles.push(newVehicle);
    saveVehicles(vehicles);
    return newVehicle;
  },

  update: async (id: number, data: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const vehicles = loadVehicles();
    const updatedVehicles = vehicles.map((v) =>
      v.id === id ? { ...data, id } : v
    );
    saveVehicles(updatedVehicles);
    return { ...data, id };
  },

  remove: async (id: number): Promise<void> => {
    const vehicles = loadVehicles();
    const filteredVehicles = vehicles.filter((v) => v.id !== id);
    saveVehicles(filteredVehicles);

    await serviceAPI.removeByVehicleId(id);
  },
};
