import * as s from 'superstruct';
import { webManifestSchema } from './schema';

export type WebManifest = s.Infer<typeof webManifestSchema>;
