import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { RequestError } from 'src/libs';
import * as api from '../../requests';

const PLUGIN_ITEMS_AMOUNT = 1000;

const { config, send } = api.service.getFlat;
type Data = Awaited<ReturnType<typeof send>>;
type Params = Parameters<typeof send>[0];
type Err = RequestError<Data>;
type Options = UseInfiniteQueryOptions<Data, Err>;

export const useGetInfinityServiceFlat = (params: Omit<Params, 'page' | 'limit'>, options?: Options) => {
  const result = useInfiniteQuery<Data, Err>({
    queryKey: [config.id, config.method, config.url, params],
    queryFn: ({ pageParam = 1 }) => {
      return send({ ...params, page: pageParam, limit: PLUGIN_ITEMS_AMOUNT });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination_params.page <
        Math.ceil(lastPage.pagination_params.total / lastPage.pagination_params.limit)
        ? lastPage.pagination_params.page + 1
        : undefined;
    },
    ...options,
  });

  return { ...result, data: result.data };
};
