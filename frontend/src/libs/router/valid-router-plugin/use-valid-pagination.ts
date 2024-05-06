import React, { useCallback } from 'react';
import { useRouter } from 'react-router5';
import { capitalize } from 'lodash';
import { GetParamsByRouteName, RouteNodeList } from './types';
import { useValidRouteParams } from './use-valid-route-params';

type Pagination = { page: number; limit: number };
type OnPageChange = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
type OnRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

type AddPrefix<T extends Record<string, any>, Prefix extends string = ''> = Prefix extends ''
  ? T
  : {
      [K in keyof T as K extends string ? `${Prefix}${Capitalize<K>}` : K]: T[K];
    };

type RouteNodeListWithPagination<K extends RouteNodeList, Prefix extends string = ''> = K extends RouteNodeList
  ? GetParamsByRouteName<K> extends AddPrefix<Pagination, Prefix>
    ? K
    : never
  : never;

type Return<K extends RouteNodeList, Prefix extends string = ''> = RouteNodeListWithPagination<
  K,
  Prefix
> extends undefined
  ? never
  : AddPrefix<Pagination, Prefix> &
      AddPrefix<{ pageChange: OnPageChange; rowsPerPageChange: OnRowsPerPageChange }, `on${Capitalize<Prefix>}`>;

export const useValidPagination = <K extends RouteNodeList, Prefix extends string = ''>(
  nodeName: RouteNodeListWithPagination<K, Prefix>,
  prefix?: Prefix,
): Return<K, Prefix> => {
  const router = useRouter();
  const params: any = useValidRouteParams(nodeName); // any, но есть валидация в useValidRouteParams

  const pageName = prefix ? `${prefix}Page` : 'page';
  const limitName = prefix ? `${prefix}Limit` : 'limit';
  const onPageChangeName = prefix ? `on${capitalize(prefix)}PageChange` : 'onPageChange';
  const onRowsPerPageChangeName = prefix ? `on${capitalize(prefix)}RowsPerPageChange` : 'onRowsPerPageChange';

  const page = params?.[pageName];
  const limit = params?.[limitName];

  const onPageChange = useCallback<OnPageChange>(
    (e, newPage) => {
      router.validNavigate(nodeName, { ...params, [pageName]: newPage, [limitName]: limit });
    },
    [limit, limitName, nodeName, pageName, params, router],
  );

  const onRowsPerPageChange = useCallback<OnRowsPerPageChange>(
    event => {
      router.validNavigate(nodeName, { ...params, [pageName]: page, [limitName]: Number(event.target.value) });
    },
    [limitName, nodeName, page, pageName, params, router],
  );

  return {
    [pageName]: page,
    [limitName]: limit,
    [onPageChangeName]: onPageChange,
    [onRowsPerPageChangeName]: onRowsPerPageChange,
  } as unknown as Return<K, Prefix>;
};
