import { Service } from '@/types/globals';

let services: Service[] = [
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

let lastId = services.length;

export const serviceAPI = {
  getAll: async (vehicleId: number): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(services.filter((s) => s.vehicleId === vehicleId));
      }, 300);
    });
  },

  add: async (service: Omit<Service, 'id'>): Promise<Service> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        lastId++;
        const newService = { ...service, id: lastId };
        services.push(newService);
        resolve(newService);
      }, 300);
    });
  },

  update: async (
    id: number,
    data: Omit<Service, 'id'>
  ): Promise<Service | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = services.findIndex((s) => s.id === id);
        if (index === -1) {
          resolve(null);
          return;
        }
        services[index] = { id, ...data };
        resolve(services[index]);
      }, 300);
    });
  },

  remove: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        services = services.filter((s) => s.id !== id);
        resolve(true);
      }, 300);
    });
  },
};
