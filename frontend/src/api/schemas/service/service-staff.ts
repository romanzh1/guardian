import * as z from 'zod';

export const serviceStaff = z.object({
  department: z.string(),
  direction_id: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  middle_name: z.string(),
  role: z.string(),
  service_role: z.string(),
});
