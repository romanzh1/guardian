import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.serviceTypePageList;

export type Params = {
  limit?: number;
  page?: number;
  name?: string;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/service-type',
  positiveSchema: response,
};

export const send = (queryParams: Params) =>
  request.send<Response>({
    ...config,
    queryParams,
  });
