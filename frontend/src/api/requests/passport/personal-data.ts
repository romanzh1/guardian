import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';

const response = z.object({
  user: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    middle_name: z.string(),
    email: z.string(),
    phone: z.number(),
    birthday: z.string(),
    gender: z.string(),
    avatar: z.string(),
  }),
});

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/passport/api/v2/user/personal_data',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
