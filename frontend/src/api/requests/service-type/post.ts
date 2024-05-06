import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const { response } = schemas;
export type Params = {
  description: string;
  name: string;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/service-type',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
