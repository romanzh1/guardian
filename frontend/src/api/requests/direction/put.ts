import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const response = schemas.direction;

export type Params = {
  serviceId: string;
  directionId: string;
  body: {
    description: string;
    name: string;
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/direction/${params.directionId}`,
    body: JSON.stringify(params.body),
  });
