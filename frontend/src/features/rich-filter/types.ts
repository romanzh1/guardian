/* eslint-disable camelcase */
import {
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverRefetchErrorResult,
  QueryObserverSuccessResult,
} from '@tanstack/react-query';
import { RecordType } from 'src/shared/components/tables/table/types';
import { QueryOptions, RequestError } from 'src/libs';
import { Data, SendFn } from 'src/libs/react-query-utils/types';

export enum TypeComponentFilter {
  Select = 'select',
  Text = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Date = 'date',
  IP = 'inet',
}

export type KeysForOptions = {
  id: string | number;
  name: string;
};

export type FilterKey = {
  name: string;
  type: string;
  id: string | number;
  hasOperators?: boolean;
};

export type FilterValue =
  | string
  | {
      id: string | number;
      name: string;
    };

export type ApiOmitResponse = Omit<
  | QueryObserverRefetchErrorResult<any, RequestError<Data<any>>>
  | QueryObserverSuccessResult<any, RequestError<Data<any>>>
  | QueryObserverLoadingErrorResult<any, RequestError<Data<any>>>
  | QueryObserverLoadingResult<any, RequestError<Data<any>>>,
  'data'
>;

export type ApiRequest = (
  params: {
    search?: string;
  } & RecordType,
) => ApiOmitResponse & { data: { data: any[] }; isInitial: boolean };

export type ApiShortRequest = (
  params: {
    name: string;
  } & RecordType,
) => ApiOmitResponse & { data: any[] };

export type ApiReq = <T extends SendFn>(
  {
    id,
  }: {
    id: string | number;
  } & RecordType,
  options?: QueryOptions<T>,
) => ApiOmitResponse & { data: { data: any }; isInitial: boolean; isLoading: boolean };

export type FilterConfig = {
  value: FilterValue;
  params?: RecordType;
  operator?: KeysForOptions | null;
  api?: ApiRequest;
  apiShort?: ApiShortRequest;
  apiReq?: ApiReq;
  keys?: KeysForOptions;
  options?: KeysForOptions[];
  needReq?: boolean;
};

export type Filter = FilterKey & FilterConfig;

export const OPERATORS: { [key: string]: KeysForOptions[] } = {
  [TypeComponentFilter.Text]: [
    { id: 'in', name: 'содержит' },
    { id: 'eq', name: '=' },
  ],
  [TypeComponentFilter.Number]: [
    { id: 'gt', name: '>' },
    { id: 'lt', name: '<' },
    { id: 'eq', name: '=' },
  ],
  [TypeComponentFilter.Boolean]: [{ id: 'eq', name: '=' }],
  [TypeComponentFilter.Date]: [
    { id: 'gt', name: '>' },
    { id: 'lt', name: '<' },
    { id: 'eq', name: '=' },
  ],
  [TypeComponentFilter.IP]: [{ id: 'eq', name: '=' }],
};

export enum TypeSaveFilter {
  New = 'new',
  Same = 'same',
}
