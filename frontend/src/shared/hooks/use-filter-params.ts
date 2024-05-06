import { useRoute } from 'react-router5';
import { useMemo } from 'react';
import { Filter } from 'src/shared/types/filters';

export type FilterParams = {
  newPrefix?: string;
  name?: string;
  filter: string;
};

type oneFilterParam = {
  prefix: Filter;
  filter: string;
};

export type AllFiltersParams = {
  owner: oneFilterParam;
  tag: oneFilterParam;
  types: oneFilterParam;
  status: oneFilterParam;
  user: oneFilterParam;
  role: oneFilterParam;
  clause: oneFilterParam;
  category: oneFilterParam;
  provider: oneFilterParam;
  consumer: oneFilterParam;
};

export type FilterTagParams = {
  name?: string;
  path: string;
  filter: string;
};

export type RouterFilterParams = {
  onFilter: ({ name, filter, newPrefix }: FilterParams) => void;
  filterParams: FilterParams;
  allFilterParams: AllFiltersParams;
  onClearFilter: () => void;
  onPrefixFilterClear: (value: string) => void;
  onClearAllFilter: () => void;
  onFilterOtherPage: ({ name, path, filter }: FilterTagParams) => void;
};

export type DefaultParams = {
  paramsPrefix?: string;
};

export const useFilterParams = (defaultParams: DefaultParams = {}): RouterFilterParams => {
  const { paramsPrefix } = defaultParams;
  const {
    router,
    route: { name: routeName, params },
  } = useRoute();
  return useMemo<RouterFilterParams>(() => {
    const prefix = paramsPrefix ? `${paramsPrefix}_` : '';
    const paramsMap = {
      name: `${prefix}name`,
      filter: `${prefix}filter`,
    };
    return {
      onFilter: ({ name, filter, newPrefix }: FilterParams) => {
        if (newPrefix) {
          router.navigate(routeName, {
            ...params,
            [paramsMap.name]: name,
            [`${newPrefix}_filter`]: filter,
          });
        } else {
          router.navigate(routeName, {
            ...params,
            [paramsMap.name]: name,
            [paramsMap.filter]: filter,
          });
        }
      },
      onFilterOtherPage: ({ name, filter, path }: FilterTagParams) => {
        router.navigate(path, {
          [paramsMap.name]: name,
          [paramsMap.filter]: filter,
        });
      },
      onClearFilter: () => {
        const { [paramsMap.filter]: filter, ...croppedParams } = params;
        router.navigate(routeName, croppedParams);
      },
      onPrefixFilterClear: (value: string) => {
        const { [`${value}_filter`]: filter, ...croppedParams } = params;
        router.navigate(routeName, croppedParams);
      },
      onClearAllFilter: () => {
        router.navigate(routeName, { id: params.id, tab: params.tab });
      },
      filterParams: {
        filter: params[paramsMap.filter] || '',
        name: params[paramsMap.name] || '',
      },
      allFilterParams: {
        owner: {
          prefix: Filter.owner,
          filter: params.owner_filter || '',
        },
        tag: {
          prefix: Filter.tag,
          filter: params.tag_filter || '',
        },
        types: {
          prefix: Filter.type,
          filter: params.type_filter || '',
        },
        status: {
          prefix: Filter.status,
          filter: params.status_filter || '',
        },
        user: {
          prefix: Filter.user,
          filter: params.user_filter || '',
        },
        role: {
          prefix: Filter.role,
          filter: params.role_filter || '',
        },
        clause: {
          prefix: Filter.clause,
          filter: params.clause_filter || '',
        },
        category: {
          prefix: Filter.category,
          filter: params.category_filter || '',
        },
        provider: {
          prefix: Filter.provider,
          filter: params.provider_filter || '',
        },
        consumer: {
          prefix: Filter.consumer,
          filter: params.consumer_filter || '',
        },
      },
    };
  }, [params, paramsPrefix, routeName, router]);
};
