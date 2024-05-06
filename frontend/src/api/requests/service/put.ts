import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.any();

export type Params = {
  id: string;
  body: {
    service: {
      category: string;
      description: string | null;
      git: string | null;
      name: string;
      short_name: string;
      criticality: string;
      parent_id: string | null;
      sla: string | null;
      status_id: string | null;
      type_id: string;
      wiki: string | null;
    };
    tag_ids: Array<string>;
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'PUT',
  url: '/api/v1/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.id}`,
    body: JSON.stringify(params.body),
  });
