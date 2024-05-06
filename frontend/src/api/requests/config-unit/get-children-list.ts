import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.serviceConfigUnitList;

export type Params = {
  configId: string;
  queryParams: {
    limit: number;
    page: number;
    name: string;
  };
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'config-unit-children-list',
  method: 'GET',
  url: '/api/v1/config-unit',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.configId}/children`,
  });
