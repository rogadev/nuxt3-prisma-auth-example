import { prisma } from '.';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';

const userDataSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(12, { message: 'Password must be at least 12 characters' }),
  passwordConfirm: z.string().min(1, { message: 'Password confirmation is required' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).optional(),
  photo: z.string().url({ message: 'Photo link must be a valid URL.' }).optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
});

type UserData = z.infer<typeof userDataSchema>;

export const createUser = (userData: UserData) => {
  // Initial Input Validation
  const userDataValidationResult = userDataSchema.safeParse(userData);
  if (!userDataValidationResult.success) {
    const errors = userDataValidationResult.error.flatten().fieldErrors;
    throw new Error(errors);
  }
  const hashedPassword = bcrypt.hashSync(userData.password, 11);
  let user: User;
  try {
    user = prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        photo: userData.photo,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return user;
};