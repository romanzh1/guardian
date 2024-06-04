import * as z from 'zod';
import login from './login/route';
import rootPage from './root/index';

export const routes = [
  login,
  {
    name: 'root',
    path: '/',
    title: 'Основная страница учетных записей',
    Component: rootPage,
    paramsSchema: z.object({
      id: z.string().default(''),
    }),
  },
  {
    name: 'secure-note',
    path: '/secure-note',
    title: 'Страница защищенных заметок',
    Component: rootPage,
    paramsSchema: z.object({
      id: z.string().default(''),
    }),
  },
] as const;
