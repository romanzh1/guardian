import { useMemo, useState } from 'react';
import { OrderTypes } from 'src/shared/components/tables/table/types';
import { INIT_PAGE_LIMIT } from 'src/constants';

export type SortType = {
  name: string;
  direction: OrderTypes;
};

export type SortEventType = {
  name: string;
  direction: OrderTypes;
};

export type DialogsParams = {
  page: number;
  limit: number;
  search: string;
  onSetPage: (page: number) => void;
  onSetPerPage: (perPage: number) => void;
  onSearch: (value: string) => void;
  onSort: ({ name, direction }: SortEventType) => void;
  sortParams: SortType;
};

export type DefaultRouteParams = {
  defaultSortName?: string;
  defaultDirection?: OrderTypes;
  defaultLimit?: number;
};

export const useTableStateParams = (defaultParams: DefaultRouteParams = {}): DialogsParams => {
  const { defaultSortName = '', defaultDirection = OrderTypes.ASC, defaultLimit = INIT_PAGE_LIMIT } = defaultParams;
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(defaultLimit);
  const [page, setPage] = useState(1);
  const [sortParams, setSortParams] = useState<SortEventType>({ name: defaultSortName, direction: defaultDirection });
  return useMemo<DialogsParams>(
    () => ({
      search,
      limit,
      page,
      onSetPage: (newPage: number) => setPage(newPage),
      onSetPerPage: (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
      },
      onSearch: (value: string) => setSearch(value),
      sortParams,
      onSort: ({ name, direction }: SortEventType) => setSortParams({ name, direction }),
    }),
    [limit, page, search, sortParams],
  );
};
