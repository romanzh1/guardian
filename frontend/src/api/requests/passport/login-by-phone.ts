import * as z from 'zod';
import { RequestConfig, TRequest } from 'src/libs';
import { request } from '../../instance';
import { PASSPORT_ERROR } from './passport-error';

const response = z.object({
  token: z.string(),
  till_next_request: z.number(),
  code_length: z.number(),
});

const negativeResponse = z.object({ error: z.string() });

export type Params = {
  isTermsAndConditionsAccepted: boolean;
  phone: string;
};
export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof negativeResponse>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/passport/api/v2/auth/login_by_phone',
  positiveSchema: response,
  negativeSchema: negativeResponse,
  backErrorHandler: (query: TRequest<NegativeResponse>) => {
    return PASSPORT_ERROR[query.data.error] || 'Ошибка авторизации';
  },
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify({
      is_terms_and_conditions_accepted: params.isTermsAndConditionsAccepted,
      phone: params.phone,
    }),
  });
