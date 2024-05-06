import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.object({ id: z.string() });

export type Params = {
  comment: string;
  quota: number;
  resource_id: string;
  service_id: string;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/clause/enlarge',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
