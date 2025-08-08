import { Vehicle } from '@/types/globals';

export const fetchPublicVehicles = async (): Promise<Vehicle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, brand: 'BMW', model: 'M4 CS', year: 2015 },
        { id: 2, brand: 'BMW', model: '323d', year: 2015 },
        { id: 3, brand: 'BMW', model: '320d', year: 2015 },
        { id: 4, brand: 'BMW', model: '318d', year: 2015 },
        { id: 5, brand: 'BMW', model: '316d', year: 2015 },
        { id: 6, brand: 'Chevrolet', model: 'Camaro', year: 2015 },
        { id: 7, brand: 'Land Rover', model: 'Velar', year: 2015 },
        { id: 8, brand: 'Toyota', model: 'Corolla', year: 2018 },
        { id: 9, brand: 'Audi', model: 'A3', year: 2020 },
        { id: 10, brand: 'Audi', model: 'A4', year: 2020 },
        { id: 11, brand: 'Audi', model: 'A5', year: 2020 },
        { id: 12, brand: 'Audi', model: 'A6', year: 2020 },
        { id: 13, brand: 'Ford', model: 'Focus', year: 2017 },
        { id: 14, brand: 'VW', model: 'Golf 3', year: 2010 },
        { id: 15, brand: 'VW', model: 'Golf 4', year: 2013 },
        { id: 16, brand: 'VW', model: 'Golf 5', year: 2015 },
        { id: 17, brand: 'VW', model: 'Golf 6', year: 2015 },
        { id: 18, brand: 'VW', model: 'Golf 7', year: 2019 },
        { id: 19, brand: 'Mercedes', model: 'A230', year: 2021 },
        { id: 20, brand: 'Opel', model: 'Astra', year: 2010 },
        { id: 21, brand: 'Peugeot', model: '308', year: 2020 },
        { id: 22, brand: 'Peugeot', model: '206', year: 2009 },
        { id: 23, brand: 'Renault', model: 'Clio', year: 2019 },
        { id: 24, brand: 'Kia', model: 'Ceed', year: 2018 },
        { id: 25, brand: 'Hyundai', model: 'i30', year: 2021 },
        { id: 26, brand: 'Hyundai', model: 'i20', year: 2021 },
        { id: 27, brand: 'Skoda', model: 'Octavia', year: 2022 },
        { id: 28, brand: 'Skoda', model: 'Superb', year: 2022 },
        { id: 29, brand: 'Nissan', model: 'Qashqai', year: 2015 },
        { id: 30, brand: 'Mazda', model: 'CX-5', year: 2016 },
        { id: 31, brand: 'Subaru', model: 'Impreza', year: 2015 },
        { id: 32, brand: 'Tesla', model: 'Model S', year: 2018 },
        { id: 33, brand: 'Volvo', model: 'XC90', year: 2017 },
        { id: 34, brand: 'Jaguar', model: 'XE', year: 2015 },
        { id: 35, brand: 'Alfa Romeo', model: 'Giulia', year: 2016 },
        { id: 36, brand: 'Honda', model: 'Civic', year: 2015 },
        { id: 37, brand: 'Toyota', model: 'Camry', year: 2015 },
        { id: 38, brand: 'Mercedes', model: 'C200', year: 2015 },
        { id: 39, brand: 'BMW', model: 'X3', year: 2017 },
        { id: 40, brand: 'Audi', model: 'Q5', year: 2016 },
        { id: 41, brand: 'Ford', model: 'Mondeo', year: 2015 },
        { id: 42, brand: 'Peugeot', model: '3008', year: 2015 },
        { id: 43, brand: 'Citroen', model: 'C4', year: 2015 },
      ]);
    }, 500);
  });
};
