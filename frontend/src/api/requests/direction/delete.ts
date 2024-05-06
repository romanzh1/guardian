import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Params = { serviceId: string; directionId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/direction/${params.directionId}`,
  });
