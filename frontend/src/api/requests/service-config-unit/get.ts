import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.serviceConfigUnit.serviceConfigUnit;

export type Response = z.infer<typeof response>;

export type Params = {
  parentId: string;
};

export const config: RequestConfig = {
  id: 'get service config-unit by parentId',
  method: 'GET',
  url: '/api/v1/config-unit/parent',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.parentId}`,
  });
