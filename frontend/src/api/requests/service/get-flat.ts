import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.serviceFlatList;

export type Params = {
  page: number;
  name?: string;
  limit: number;
  owner_id?: string;
  status?: string;
  type_id?: string;
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v2/service/flat',
  positiveSchema: response,
};

export const send = (queryParams: Params) =>
  request.send<Response>({
    ...config,
    queryParams,
  });
