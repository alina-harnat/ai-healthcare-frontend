import { z } from 'zod';

export const drugSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().min(1),
  dosage: z.string().min(1),
  indications: z.array(z.string()).min(1),
  contraindications: z.array(z.string()).min(1),
  sideEffects: z.array(z.string()).min(1),
  activeIngredients: z.array(z.string()).min(1),
});

export type DrugFormValues = z.infer<typeof drugSchema>;
