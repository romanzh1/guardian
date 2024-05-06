import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';
import * as schemas from '../../schemas';

const { response } = schemas;

export type Params = {
  service: {
    description: string | null;
    category: string;
    git: string | null;
    name: string;
    criticality: string;
    parent_id: string | null;
    sla: string | null;
    status_id: string;
    short_name: string;
    type_id: string;
    wiki: string | null;
  };
  tag_ids: Array<string>;
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    body: JSON.stringify(params),
  });
