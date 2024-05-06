import React from 'react';

const route = {
  name: 'login',
  path: '/login',
  title: 'Вход',
  Component: React.lazy(() => import('./index')),
  fullName: 'login',
} as const;

export default route;
