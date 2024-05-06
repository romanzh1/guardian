import { notify } from './notify';

export const standard = (message: string) => notify(message, { key: message, variant: 'default' });

export const success = (message: string) => notify(message, { key: message, variant: 'success' });

export const error = (message: string) => notify(message, { key: message, variant: 'error' });

export const warning = (message: string) => notify(message, { key: message, variant: 'warning' });

export const info = (message: string) => notify(message, { key: message, variant: 'info' });

export const notifications = { notify, standard, success, error, warning, info };
