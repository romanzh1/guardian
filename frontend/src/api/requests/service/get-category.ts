import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';
import { OrderTypes } from '../../../shared/components/tables/table/types';

const response = schemas.categoryUtilizationList;

export type Params = {
  serviceId: string;
  limit: number;
  page: number;
  search: string;
  sort_by?: string;
  sort_dir: OrderTypes;
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'service-category',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/config-unit/category-utilization`,
    queryParams: {
      search: params.search,
      page: params.page,
      limit: params.limit,
      [params.sort_by ? `sort_by_${params.sort_by}` : '']: params.sort_dir,
    },
  });
