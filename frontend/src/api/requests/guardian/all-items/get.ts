import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../../instance';

const response = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  user_name: z.string(),
  password: z.string(),
  is_favourite: z.boolean(),
  websites: z.array(z.string()),
  custom_fields: z.array(z.object({
    key: z.string(),
    value: z.string(),
    secret: z.boolean(),
  })).nullable(),
  updated_at: z.string(),
  created_at: z.string(),
});

export type Params = { id: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: 'http://localhost:8080/api/accounts',
  positiveSchema: response,
};

export const send = (params: Params) => {
  return request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
  });
};