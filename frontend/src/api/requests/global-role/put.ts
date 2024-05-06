import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Params = {
  id: string;
  body: {
    created_at: string;
    description: string;
    folder_id: string;
    id: string;
    measurement: string;
    name: string;
    service_id: string;
    type_id: string;
    updated_at: string;
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/role',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
    body: JSON.stringify(params.body),
  });
