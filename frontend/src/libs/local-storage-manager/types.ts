import * as z from 'zod';
import { storage } from './schemas';

export type LocalStorageType = z.infer<typeof storage>;
