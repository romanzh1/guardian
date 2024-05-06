import { useCallback, useMemo } from 'react';
import { RouteContext } from 'react-router5/dist/types';
import { useRoute } from 'react-router5';
import _ from 'lodash';
import { OrderTypes } from 'src/shared/components/tables/table/types';
import { INIT_PAGE_LIMIT } from 'src/constants';
import { Filter } from 'src/features/rich-filter/types';

const MAIN_PARAMS = ['page', 'limit', 'sortName', 'direction', 'search'];

export type SortType = {
  name: string;
  direction: OrderTypes;
};

export type SortEventType = {
  name: string;
  direction: OrderTypes;
};
export type FilterEventType = {
  name: string;
  value: unknown;
};

export type BasicRouteParams = RouteContext;
export type ExtendedRouteParams = {
  onSetPage: (page: number) => void;
  onSetPerPage: (perPage: number) => void;
  onSearch: (value: string) => void;
  onSort: ({ name, direction }: SortEventType) => void;
  onFilter: ({ name, value }: FilterEventType) => void;
  onFilterArr: (value: Filter[]) => void;
  onClear: (initParams: Record<string, any>) => void;
  sortParams: SortType;
  date: Date | null;
  onChangeDate: (date: Date | null) => void;
  page: number;
  limit: number;
  filter: Record<string, unknown>;
  search: string;
};

export type DefaultRouteParams = {
  defaultSortName?: string;
  defaultDirection?: OrderTypes;
  defaultLimit?: number;
  paramsPrefix?: string;
};

export const useRouteParams = (defaultParams: DefaultRouteParams = {}): RouteContext & ExtendedRouteParams => {
  const {
    defaultSortName = '',
    defaultDirection = OrderTypes.ASC,
    paramsPrefix,
    defaultLimit = INIT_PAGE_LIMIT,
  } = defaultParams;
  const {
    router,
    route,
    route: { name: routeName, params },
    previousRoute,
  } = useRoute();

  const paramsMap = useMemo(() => {
    const result: Record<string, string> = {};
    const prefix = paramsPrefix ? `${paramsPrefix}-` : '';
    MAIN_PARAMS.forEach(item => {
      result[item] = `${prefix}${item}`;
    });
    return result;
  }, [paramsPrefix]);

  const getFilter = useMemo(() => {
    const result: Record<string, string> = {};
    const mainParams = Object.values(paramsMap);
    Object.keys(params)
      .filter(item => !mainParams.includes(item))
      .forEach(item => {
        result[item] = params[item];
      });

    return result;
  }, [paramsMap, params]);

  const handlerClear = useCallback(
    (initParams?: Record<string, any>) => {
      router.navigate(routeName, { ...initParams });
    },
    [router, routeName],
  );

  return useMemo<RouteContext & ExtendedRouteParams>(
    () => {
      const prefix = paramsPrefix ? `${paramsPrefix}-` : '';
      const prefixParams = {
        page: `${prefix}page`,
        limit: `${prefix}limit`,
        sortName: `${prefix}sortName`,
        direction: `${prefix}direction`,
        search: `${prefix}search`,
        date: `${prefix}date`,
      };

      return {
        onSetPage: (page: number) => {
          router.navigate(routeName, {
            ...params,
            [prefixParams.page]: page,
          });
        },
        onSetPerPage: (limit: number) => {
          router.navigate(routeName, {
            ...params,
            [prefixParams.limit]: limit,
            [prefixParams.page]: 1,
          });
        },
        onSort: ({ name, direction }: SortEventType) => {
          router.navigate(routeName, {
            ...params,
            [prefixParams.sortName]: name,
            [prefixParams.direction]: direction,
          });
        },
        onSearch: (value: string) => {
          if (value.length > 0) {
            const routeParams = {
              ...params,
              [prefixParams.search]: value,
            };
            router.navigate(routeName, routeParams);
          } else {
            const { [prefixParams.search]: search, ...croppedParams } = params;
            router.navigate(routeName, croppedParams);
          }
        },
        onChangeDate: (date: Date | null) => {
          if (date) {
            const text = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
            router.navigate(routeName, {
              ...params,
              [prefixParams.date]: text,
            });
          } else {
            const { [prefixParams.date]: dateParam, ...croppedParams } = params;
            router.navigate(routeName, croppedParams);
          }
        },
        onFilter: ({ name, value }: FilterEventType) => {
          const res = {
            ...params,
            [name]: value,
          };
          if (!value) {
            delete res[name];
          }

          router.navigate(routeName, res);
        },
        onFilterArr: (filters: Filter[]) => {
          if (!filters.length) return;
          const res = { ...params };
          if (params?.[paramsMap.page] !== '1') {
            res[paramsMap.page] = '1';
          }
          filters.forEach(item => {
            if (item.value) {
              if (typeof item.value === 'object') {
                let newValue = item.value.id;
                if (item.operator) {
                  newValue = JSON.stringify({
                    [item.operator.id]: item.type === 'boolean' ? Boolean(item.value.id) : item.value.id,
                  });
                }
                res[item.id] = newValue;
              } else {
                let newValue = item.value;
                if (item.operator) {
                  newValue = JSON.stringify({
                    [item.operator.id]: item.type === 'number' ? Number(item.value) : item.value,
                  });
                }
                res[item.id] = newValue;
              }
            } else {
              delete res[item.id];
            }
          });
          if (!_.isEqual(res, params)) {
            router.navigate(routeName, res);
          }
        },
        onClear: handlerClear,
        sortParams: {
          name: params[paramsMap.sortName] || defaultSortName,
          direction: params[paramsMap.direction] || defaultDirection,
        },
        date: params[paramsMap.date] ? new Date(params[paramsMap.date]) : null,
        limit: Number(params[paramsMap.limit]) || defaultLimit,
        page: Number(params[paramsMap.page]) || 1,
        search: params[paramsMap.search] || '',
        filter: getFilter,
        router,
        route,
        previousRoute,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultParams, params, routeName, router],
  );
};
