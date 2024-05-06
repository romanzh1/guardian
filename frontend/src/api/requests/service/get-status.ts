import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.shortList;

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get service status',
  method: 'GET',
  url: '/api/v1/service/status',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });