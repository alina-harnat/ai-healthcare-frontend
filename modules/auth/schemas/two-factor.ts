import { z } from 'zod';

export const twoFactorCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/),
});

export type TwoFactorCodeValues = z.infer<typeof twoFactorCodeSchema>;
