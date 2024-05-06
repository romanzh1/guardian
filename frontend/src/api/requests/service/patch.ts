import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const response = schemas.direction;

export type Params = {
  id: string;
  body: {
    created_at: string;
    department: string;
    direction_id: string;
    first_name: string;
    id: string;
    last_name: string;
    middle_name: string;
    role: string;
    role_id: string;
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PATCH',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
    body: JSON.stringify(params.body),
  });
