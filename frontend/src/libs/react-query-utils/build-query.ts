import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Data, Err, SendFn, Query, Variables } from './types';

export type QueryOptions<T extends SendFn> = UseQueryOptions<Data<T>, Err<T>>;

type UseQueryResultWithInitial<T, K> = Omit<UseQueryResult<T, K>, 'data'> & {
  data: T;
  isInitial: boolean;
};

type UseExecuteQuery<T extends SendFn, QueryResult> = Variables<T> extends undefined
  ? (options?: QueryOptions<T>) => QueryResult
  : (params: Variables<T>, options?: QueryOptions<T>) => QueryResult;

type BuildQuery<T extends SendFn, InitialData extends undefined | Data<T>> = InitialData extends Data<T>
  ? UseExecuteQuery<T, UseQueryResultWithInitial<Data<T>, Err<T>>>
  : UseExecuteQuery<T, UseQueryResult<Data<T>, Err<T>>>;

export const buildQuery = <Q extends Query, S extends Q['send'], I extends undefined | Data<S> = undefined>(
  query: Q,
  initData?: I,
  defaultOptions?: QueryOptions<S>,
): BuildQuery<S, I> => {
  const { send, config } = query;
  type SendType = typeof send;

  let useExecuteQuery;
  if (send.length === 0) {
    useExecuteQuery = (options?: QueryOptions<SendType>) => {
      let queryKey;
      if (typeof config === 'function') {
        const newConfig = config();
        queryKey = [newConfig.id, newConfig.method, newConfig.url, newConfig.queryParams];
      } else {
        queryKey = [config.id, config.method, config.url];
      }

      const result = useQuery<Data<SendType>, Err<SendType>>({
        queryKey,
        queryFn: () => send(),
        ...defaultOptions,
        ...options,
      });
      if (initData) {
        if (result.data) return { ...result, isInitial: false };
        return { ...result, data: initData, isInitial: true };
      }

      return result;
    };
  } else {
    useExecuteQuery = (params: Variables<SendType>, options?: QueryOptions<SendType>) => {
      let queryKey;
      if (typeof config === 'function') {
        const newConfig = config(params);
        queryKey = [newConfig.id, newConfig.method, newConfig.url, newConfig.queryParams];
      } else {
        queryKey = [config.id, config.method, config.url, params];
      }

      const result = useQuery<Data<SendType>, Err<SendType>>({
        queryKey,
        queryFn: () => send(params),
        ...defaultOptions,
        ...options,
      });

      if (initData) {
        if (result.data) return { ...result, isInitial: false };
        return { ...result, data: initData, isInitial: true };
      }

      return result;
    };
  }

  return useExecuteQuery as any;
};
