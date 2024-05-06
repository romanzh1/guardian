import * as s from 'superstruct';
import { Deploy } from './constants';

export const webManifestSchema = s.object({
  title: s.string(),
  theme: s.string(),
  deploy: s.enums([...Object.values(Deploy)]),
  debug: s.boolean(),
});
