import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(2, { message: 'email/username is required' }),
  password: z.string().min(2, { message: 'Password is required' }),
});
