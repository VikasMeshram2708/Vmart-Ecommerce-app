import * as z from 'zod';

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be 2 characters long.',
    })
    .max(150, {
      message: 'Name must be at least 150 characters long.',
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: 'Password must be at least 5 characters long.',
    })
    .max(150, {
      message: 'Password must be at least 150 characters long',
    }),
});

export type UserSchema = z.infer<typeof UserSchema>;
