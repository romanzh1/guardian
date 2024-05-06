import * as z from 'zod';
import { error } from 'src/api/schemas';
import { BACK_ERROR, TRequest } from '../../request';
import { CUSTOM_ERRORS } from './custom-back-errors';

const negativeResponse = error;
type NegativeResponse = z.infer<typeof negativeResponse>;

export const getResponseError = (query: TRequest<NegativeResponse>) => {
  if (CUSTOM_ERRORS[query.data.error]) {
    return CUSTOM_ERRORS[query.data.error];
  }
  return `${BACK_ERROR[query.status]} - ${query.requestConfig?.method} ${query.requestConfig?.url}`;
};
