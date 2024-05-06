import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { OrderTypes } from 'src/shared/components/tables/table/types';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.service.serviceDependentList;

export type Response = z.infer<typeof response>;

export type Params = {
  limit: number;
  page: number;
  name: string;
  sort_by?: string;
  sort_dir: OrderTypes;
  owner: string;
  type: string;
  status: string;
  tag: string;
};

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/service/dependent',
  positiveSchema: response,
};

export const send = (queryParams: Params) =>
  request.send<Response>({
    ...config,
    queryParams: {
      page: queryParams.page,
      name: queryParams.name,
      limit: queryParams.limit,
      [queryParams.sort_by ? `sort_by_${queryParams.sort_by}` : '']: queryParams.sort_dir,
      owner_id: queryParams.owner,
      type_id: queryParams.type,
      status: queryParams.status,
      tag_id: queryParams.tag,
    },
  });
