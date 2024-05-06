import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Params = {
  serviceId: string;
  body: {
    direction_id: Array<string> | null;
    groups: {
      group_id: string;
      service_role_id: string;
    }[];
    user_id: string;
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
    url: `${config.url}/${params.serviceId}/user`,
    body: JSON.stringify(params.body),
  });
