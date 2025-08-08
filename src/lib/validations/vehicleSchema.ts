import { z } from 'zod';

export const vehicleSchema = z.object({
  brand: z.string().min(2, 'Unesite marku'),
  model: z.string().min(1, 'Unesite model'),
  year: z.coerce
    .number('Unesite godinu (broj)')
    .int('Godina mora biti ceo broj')
    .gte(1900, 'Godina mora biti posle 1900')
    .lte(new Date().getFullYear() + 1, 'Maksimalna godina proizvodnje je 2025'),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
