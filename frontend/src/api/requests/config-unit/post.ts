import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const { response } = schemas;

export type Params = {
  configuration_item: {
    category_id: string;
    cmdb_fields: string;
    consumer_id: string;
    id: string;
    name: string;
    parent_id: string;
    provider_id: string;
    status: string;
    utilization_id: string;
  };
  utilization_info: {
    id: string;
    quota: {
      gpu: number;
      hdd: number;
      ram: number;
    };
    utilization: {
      gpu: number;
      hdd: number;
      ram: number;
    };
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/config-unit',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
