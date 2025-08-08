import { z } from 'zod';

export const serviceSchema = z.object({
  date: z.string().nonempty('Datum je obavezan'),
  description: z.string().min(3, 'Opis mora imati najmanje 3 karaktera'),
  price: z.number('Unesite cenu').min(0, 'Cena ne može biti negativna'),
  type: z.enum(['redovni', 'kvar']),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
