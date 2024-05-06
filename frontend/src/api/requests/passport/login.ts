import * as z from 'zod';
import { RequestConfig, TRequest } from 'src/libs';
import { request } from '../../instance';
import { PASSPORT_ERROR } from './passport-error';

const response = z.object({
  cookie: z.object({}),
  token: z.string(),
});
const negativeResponse = z.object({ error: z.string() });

export type Params = {
  notifyCode?: string;
  country?: string;
  device?: string;
  token: string;
};
export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof negativeResponse>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/passport/api/v2/auth/login',
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
      options: {
        notify_code: params.notifyCode,
      },
      country: params.country,
      device: params.device,
      token: params.token,
    }),
  });
