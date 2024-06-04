import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.any();

export type Params = {
    id: string,
    body: {
        name: string,
        text: string,
    }
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
    method: 'PUT',
    url: 'http://localhost:8080/api/secure-notes',
    positiveSchema: response,
};

export const send = (params: Params) => {
    return request.send<Response>({
        ...config,
        url: `${config.url}/${params.id}`,
        body: JSON.stringify(params.body),
    })
};
