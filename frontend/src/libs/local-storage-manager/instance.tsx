import * as z from 'zod';
import { initState } from './init-state';
import { LocalStorageManager } from './local-storage-manager';
import { storage } from './schemas';

export const localStorageManager = new LocalStorageManager('wb-crop-properties', storage as z.ZodSchema, initState);
