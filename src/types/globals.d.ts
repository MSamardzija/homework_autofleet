export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

export type Service = {
  id: number;
  vehicleId: number;
  date: string;
  description: string;
  price: number;
  type: 'redovni' | 'kvar';
};

export type ServiceFormData = Omit<Service, 'id' | 'vehicleId'>;
