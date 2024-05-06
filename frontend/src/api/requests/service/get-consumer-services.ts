import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { OrderTypes } from 'src/shared/components/tables/table/types';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.consumerServiceList;

export type Response = z.infer<typeof response>;

export type Params = {
  serviceId: string;
  limit: number;
  page: number;
  name: string;
  sort_by?: string;
  sort_dir: OrderTypes;
};

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/resource/consumer-services`,
    queryParams: {
      page: params.page,
      name: params.name,
      limit: params.limit,
      [params.sort_by ? `sort_by_${params.sort_by}` : '']: params.sort_dir,
    },
  });
