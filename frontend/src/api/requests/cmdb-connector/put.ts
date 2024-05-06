import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/cmdb-connector/synchronization',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
