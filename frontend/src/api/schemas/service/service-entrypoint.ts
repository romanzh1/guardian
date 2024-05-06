import * as z from 'zod';

export const serviceEntrypoint = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.number(),
  groupId: z.string(),
  alias: z.string(),
  fields: z.array(z.any()).default([]).nullable(), // todo убрать данное поле когда его уберет бекенд
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  redirectUrl: z.string(),
});
export const serviceEntrypointList = z.array(serviceEntrypoint);
