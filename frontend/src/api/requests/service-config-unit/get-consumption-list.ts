import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.serviceConfigUnit.serviceConfigUnitConsumptionList;

export type Response = z.infer<typeof response>;

export type Params = {
  serviceId: string;
  queryParams: {
    limit: number;
    page: number;
    name: string;
  };
};

export const config: RequestConfig = {
  id: 'get service consumption',
  method: 'GET',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/config-unit/consumption`,
    queryParams: params.queryParams,
  });
