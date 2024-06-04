import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../../instance';

const response = z.array(
  z.object({
      id: z.string(),
      name: z.string(),
      updated_at: z.string(),
  }),
);

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: 'http://localhost:8080/api/secure-notes',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
