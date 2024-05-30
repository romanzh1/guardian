import * as z from 'zod';
import { request } from 'src/api/instance';
import { getResponseError, RequestConfig } from 'src/libs';

const response = z.null();

export type Params = { id: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'DELETE',
  url: 'http://localhost:8080/api/accounts',
  positiveSchema: response,
  backErrorHandler: getResponseError,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
  });
