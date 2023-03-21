import type { User } from '@prisma/client';

type ClientUserObject = {
  id: string;
  email: string;
  name?: string;
  photo?: string;
};

export const userTransformer = (user: User) => {
  const clientUserObject: ClientUserObject = {
    id: user.id,
    email: user.email,
    name: user.name,
    photo: user.photo,
  };
  return clientUserObject;
};