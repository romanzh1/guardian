import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Params = {
  user_id: string;
  role: string;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/global-role/set',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
