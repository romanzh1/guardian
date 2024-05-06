import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.configUnit.configUtilGroup;

export type Params = { configId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/config-unit/group',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.configId}`,
  });
