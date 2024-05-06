import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = z.array(schemas.service.service);

export type Params = { serviceId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'service provider',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/providers`,
  });
