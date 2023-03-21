import { sendError } from 'h3';
import { createUser } from '~/server/db/users';
import { userTransformer } from '~~/server/transformers/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, passwordConfirm, name, photo } = body;
  if (!email || !password || !passwordConfirm) {
    return sendError(event, 400, 'Missing required fields');
  }
  if (password !== passwordConfirm) {
    return sendError(event, 400, 'Passwords do not match');
  }
  try {
    const user = await createUser({ email, password, passwordConfirm, name, photo });
    return userTransformer(user);
  } catch (error) {
    return sendError(event, 400, error);
  }

});