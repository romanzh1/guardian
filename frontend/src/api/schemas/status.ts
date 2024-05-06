import * as z from 'zod';

export enum Status {
  active = 'active',
  paused = 'paused',
  inactive = 'inactive',
}
export const status = z.nativeEnum(Status);
