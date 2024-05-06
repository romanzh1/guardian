import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.null();
const negativeResponse = z.object({ error: z.string() });

export type Params = {
  configId: string;
  body: {
    category_ids: Array<string> | null;
    config_unit_group: {
      description: string;
      name: string;
    };
  };
};

export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/config-unit/group',
  positiveSchema: response,
  negativeSchema: negativeResponse,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.configId}`,
    body: JSON.stringify(params.body),
  });
