import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Data, Err, SendFn } from './types';

type UseTunedQueryResult<TData, TError, InitialData> = InitialData extends TData
  ? Omit<UseQueryResult<TData, TError>, 'data'> & { data: TData }
  : UseQueryResult<TData, TError>;

export const useTunedQuery = <T extends SendFn, S extends undefined | Data<T> = undefined>({
  queryFn,
  initialData,
  ...rest
}: {
  queryFn: T;
  initialData?: S;
} & Omit<UseQueryOptions<Data<T>, Err<T>>, 'queryFn' | 'initialData'>): UseTunedQueryResult<Data<T>, Err<T>, S> => {
  const result = useQuery<Data<typeof queryFn>, Err<typeof queryFn>>({
    queryFn,
    ...rest,
  } as UseQueryOptions<Data<typeof queryFn>, Err<typeof queryFn>>);

  if (initialData) {
    return { ...result, data: result.data || initialData } as any;
  }

  return result as any;
};
