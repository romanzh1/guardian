import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { OrderTypes } from 'src/shared/components/tables/table/types';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.configUnit.configItemCategoryList;

export type Params = {
  limit: number;
  page: number;
  name: string;
  config_unit?: string;
  sort_by?: string;
  sort_dir?: OrderTypes;
};
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/config-unit/category',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    queryParams: {
      page: params.page,
      name: params.name,
      limit: params.limit,
      config_unit: params.config_unit ? params.config_unit : '',
      [params.sort_by ? `sort_by_${params.sort_by}` : '']: params.sort_dir ? params.sort_dir : '',
    },
  });
