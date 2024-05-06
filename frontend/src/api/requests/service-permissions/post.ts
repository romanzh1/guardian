import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.object({ token: z.string() });
type Permissions = {
  id: string;
  name: string;
};

export type Params = {
  serviceId: string;
  body: {
    expire_at: string | null;
    global_permissions: Array<Permissions>;
    name: string;
    service_permissions: Array<Permissions>;
  };
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/api/v1/user/service',
  positiveSchema: response,
};

export const send = (params: Params) =>
  request.send<Response>({
    ...config,
    url: `${config.url}/${params.serviceId}/bot`,
    body: JSON.stringify(params.body),
  });
