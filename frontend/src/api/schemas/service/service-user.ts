import * as z from 'zod';
import { serviceRole } from './service-role';
import { userShort } from '../user';
import { group } from '../group';

export const serviceDirections = z.object({
  id: z.string(),
  name: z.string(),
});

export const serviceUser = z.object({
  directions: z.array(serviceDirections),
  id: z.string(),
  group_id: z.string(),
  service_role: serviceRole,
  user: userShort,
});

export const serviceUserList = z.array(serviceUser);

const groups = z.object({
  group,
  service_role: serviceRole,
});
export const userInService = z.object({
  user: userShort,
  id: z.string(),
  directions: z.array(serviceDirections),
  service_group: z.array(groups),
});
