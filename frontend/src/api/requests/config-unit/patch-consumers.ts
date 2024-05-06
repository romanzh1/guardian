import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Params = {
  config_unit_id: Array<string>;
  consumer_id: Array<string>;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PATCH',
  url: '/api/v1/config-unit',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
