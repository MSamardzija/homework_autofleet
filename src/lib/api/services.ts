import { Service } from '@/types/globals';

const STORAGE_KEY = 'services';

const defaultServices: Service[] = [
  {
    id: 1,
    vehicleId: 1,
    date: '2024-01-15',
    description: 'Promena ulja',
    price: 1000,
    type: 'redovni',
  },
  {
    id: 2,
    vehicleId: 1,
    date: '2024-03-10',
    description: 'Popravka kočnica',
    price: 3000,
    type: 'kvar',
  },
];

function loadServices(): Service[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
    return defaultServices;
  }
}

function saveServices(services: Service[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

let lastId = defaultServices.length;

export const serviceAPI = {
  getAll: async (vehicleId: number): Promise<Service[]> => {
    await new Promise((res) => setTimeout(res, 300));
    const allServices = loadServices();
    lastId = allServices.reduce((max, s) => (s.id > max ? s.id : max), 0);
    return allServices.filter((s) => s.vehicleId === vehicleId);
  },

  add: async (data: Omit<Service, 'id'>): Promise<Service> => {
    await new Promise((res) => setTimeout(res, 300));
    const allServices = loadServices();
    const newService = { ...data, id: ++lastId };
    allServices.push(newService);
    saveServices(allServices);
    return newService;
  },

  update: async (
    id: number,
    data: Omit<Service, 'id'>
  ): Promise<Service | null> => {
    await new Promise((res) => setTimeout(res, 300));
    const allServices = loadServices();
    const index = allServices.findIndex((s) => s.id === id);
    if (index === -1) return null;
    allServices[index] = { id, ...data };
    saveServices(allServices);
    return allServices[index];
  },

  remove: async (id: number): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 300));
    let allServices = loadServices();
    allServices = allServices.filter((s) => s.id !== id);
    saveServices(allServices);
    return true;
  },

  removeByVehicleId: async (vehicleId: number): Promise<void> => {
    await new Promise((res) => setTimeout(res, 300));
    let allServices = loadServices();
    allServices = allServices.filter((s) => s.vehicleId !== vehicleId);
    saveServices(allServices);
  },
};
