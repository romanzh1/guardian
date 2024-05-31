import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../../instance';

const response = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    user_name: z.string(),
    icon_link: z.string(),
    is_favourite: z.boolean(),
  }),
);

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: 'http://localhost:8080/api/accounts',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
