import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();
const negativeResponse = z.object({ error: z.string() });

export type Params = {
  id: string;
  body: {
    category_id: string;
    consumption: number;
    quota: number;
    service_id: string;
  };
};

export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof negativeResponse>;
export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/service',
  positiveSchema: response,
  negativeSchema: negativeResponse,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}/config-unit`,
    body: JSON.stringify(params.body),
  });
