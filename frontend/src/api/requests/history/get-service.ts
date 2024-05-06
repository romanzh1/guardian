import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.historyList;

export type Params = { id: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get folder',
  method: 'GET',
  url: '/api/v1/history/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
  });
