import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.configUnit.configUnitList;

export type Params = {
  category_id?: string;
  limit?: number;
  page?: number;
  name?: string;
  provider_id?: string;
  consumer_id?: string;
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'config-unit-list',
  method: 'GET',
  url: '/api/v1/config-unit',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    queryParams: params,
  });
