import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.userInService;

export type Params = { serviceId: string; userId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get service only one user',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/user/${params.userId}`,
  });
