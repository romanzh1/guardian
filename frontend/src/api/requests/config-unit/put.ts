import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();
const negativeResponse = z.object({ error: z.string() });

export type Params = {
  configId: string;
  body: {
    configuration_unit: {
      consumer_ids: Array<string>;
      provider_id: string | null;
    };
    utilization_info: {
      id: string;
      quota: {
        cpu: number;
        hdd: number;
        ram: number;
      };
      utilization: {
        cpu: number;
        hdd: number;
        ram: number;
      };
    } | null;
  };
};

export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof negativeResponse>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/config-unit',
  positiveSchema: response,
  negativeSchema: negativeResponse,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.configId}`,
    body: JSON.stringify(params.body),
  });
