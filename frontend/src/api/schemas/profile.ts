import * as z from 'zod';
import { user } from './user';

const userContact = z.object({
  phone: z.number(),
  rocket_chat: z.string(),
});

export const profile = z.object({
  senior_service_role: z.object({
    senior_role: z.string(),
  }),
  user,
  user_contact: userContact,
});
