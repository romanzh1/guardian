import * as z from 'zod';
import { request } from 'src/api/instance';
import { RequestConfig } from 'src/libs';

const response = z.any();

export type Params = {
    body: {
        name: string,
        email: string,
        user_name: string,
        password: string,
        is_favourite: boolean,
        websites:  Array<string>,
        custom_fields: {
            key: string,
            value: string,
            secret: boolean,
        }[],
        note: string,
    }
};

export type Response = z.infer<typeof response>;

export const config: RequestConfig = {
    method: 'POST',
    url: 'http://localhost:8080/api/accounts',
    positiveSchema: response,
};

export const send = (params: Params) => {
    return request.send<Response>({
        ...config,
        body: JSON.stringify(params.body),
    })
};
