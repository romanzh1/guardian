import * as z from 'zod';

export const user = z.object({
  created_at: z.string().datetime(),
  department: z.string(),
  direction_id: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  middle_name: z.string().nullable(),
  role: z.string(),
});
export const userShort = z.object({
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().nullable(),
});

export const ownerUser = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().nullable(),
});

export const ownerUserList = z.array(ownerUser);

export const userList = z.array(user);
