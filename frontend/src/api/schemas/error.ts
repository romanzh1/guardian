import * as z from 'zod';

export const error = z.object({ error: z.string() });
