import { QueryParams } from './types';

export const queryParamsStr = (queryParams?: Record<string, QueryParams>) => {
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return '';
  }

  return `?${Object.entries(queryParams)
    .map(param => param.join('='))
    .join('&')}`;
};
