import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';

const response = z.any();

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/passport/api/v2/auth/logout',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
