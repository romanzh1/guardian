import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.serviceList;

export type Params = {
  id: string;
  name: string;
  page: number;
  limit: number;
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'children-nested-services',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}/children/nested-services`,
    queryParams: {
      name: params.name,
      page: params.page,
      limit: params.limit,
    },
  });
