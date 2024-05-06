import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.configUnit.configUnitHistoryList;

export type Params = { configId: string };
export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  id: 'get config-unit-history by id',
  method: 'GET',
  url: '/api/v1/history/config-unit',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.configId}`,
  });
