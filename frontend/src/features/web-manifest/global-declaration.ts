import { WebManifest } from './types';

declare global {
  interface Window {
    WEB_MANIFEST: WebManifest;
  }
}

export {};
