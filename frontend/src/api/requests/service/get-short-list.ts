import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.serviceShortList;

export type Response = z.infer<typeof response>;

export type Params = {
  name?: string;
};

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/service/short',
  positiveSchema: response,
};

export const send = (queryParams: Params) =>
  request.send<Response>({
    ...config,
    queryParams,
  });
