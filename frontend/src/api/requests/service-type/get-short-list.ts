import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.shortList;
export type Params = {
  name?: string;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get service type short',
  method: 'GET',
  url: '/api/v1/service-type/short',
  positiveSchema: response,
};

export const send = (queryParams: Params) =>
  request.send<Response>({
    ...config,
    queryParams,
  });
