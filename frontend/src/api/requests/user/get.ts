import * as z from 'zod';
import { RequestConfig } from 'src/libs';
import { request } from '../../instance';
import * as schemas from '../../schemas';

const response = schemas.profile;

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/api/v1/user/profile',
  positiveSchema: response,
};

export const send = () =>
  request.send<Response>({
    ...config,
  });
