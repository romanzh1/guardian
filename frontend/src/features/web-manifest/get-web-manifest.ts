import * as s from 'superstruct';
import { defaultWebManifest } from './initial';
import { webManifestSchema } from './schema';

export const getWebManifest = () => {
  const webManifest = window.WEB_MANIFEST;
  try {
    s.assert(webManifest, webManifestSchema);
    return { ...webManifest };
  } catch (e) {
    console.warn('Проверьте WebManifest. Переменные окружения не соответствуют схеме.', e);
  }
  return { ...defaultWebManifest };
};
