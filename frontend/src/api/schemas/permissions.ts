import * as z from 'zod';

export const permissionDomain = z.object({
  id: z.string(),
  name: z.string(),
});

export const permissionsList = z.object({
  global_permissions: z.array(permissionDomain),
  service_permissions: z.array(permissionDomain),
});
