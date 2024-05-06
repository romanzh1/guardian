import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../../instance';

const response = z.object({
  id: z.string(),
  user_name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type Params = { id: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get user profile',
  method: 'GET',
  url: 'http://localhost:8080/api/user',
  positiveSchema: response,
};

export const send = (params: Params) => {
  return request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
  });
};
