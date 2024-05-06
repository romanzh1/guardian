import { Status } from 'src/shared/types/status';

export const STATUS: Array<Status> = [
  {
    id: 'active',
    name: 'Активен',
  },
  {
    id: 'paused',
    name: 'На паузе',
  },
  {
    id: 'inactive',
    name: 'Не активен',
  },
];

export const STATUS_KEY: Record<string, string> = {
  active: 'Активен',
  paused: 'На паузе',
  inactive: 'Не активен',
};
