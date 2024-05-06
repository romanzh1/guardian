import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.serviceUserList;

export type Params = { serviceId: string; groupId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get group of service',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/group/${params.groupId}/user`,
  });
