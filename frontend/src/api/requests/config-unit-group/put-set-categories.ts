import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const response = schemas.direction;
const negativeResponse = z.object({ error: z.string() });

export type Params = {
  categoryId: string;
  body: {
    id: Array<string>;
  };
};

export type Response = z.infer<typeof response>;
export type NegativeResponse = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/config-unit/group/{id}',
  positiveSchema: response,
  negativeSchema: negativeResponse,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.categoryId}/set-categories`,
    body: JSON.stringify(params.body),
  });
