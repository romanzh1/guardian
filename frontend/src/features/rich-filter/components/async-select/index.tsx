import React, { memo, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { SEARCH_DELAY_TIMEOUT } from 'src/constants';
import { RecordType } from 'src/shared/components/tables/table/types';
import { FilterSelect } from '../filter-select';
import { ApiRequest, ApiShortRequest, Filter, FilterValue, KeysForOptions } from '../../types';

type Props = {
  activeFilters: Filter[];
  onBackspacePress: () => void;
  onChange: (filter: FilterValue) => void;
  onClickAway: (e: TouchEvent | MouseEvent) => void;
  params?: RecordType;
  api: ApiRequest;
  apiShort: ApiShortRequest;
  keys?: KeysForOptions;
  defaultValue?: string;
};

export const AsyncSelect = memo(
  ({ activeFilters, onBackspacePress, onChange, onClickAway, api, params, keys, defaultValue, apiShort }: Props) => {
    const [search, setSearch] = useState<string>('');

    const { data } = api({ search, ...params });
    const { data: dataShort } = apiShort({ name: search, ...params });

    const handleOnChange = useCallback(
      (newValue: any) => {
        if (keys) {
          onChange({ id: newValue?.[keys?.id], name: newValue?.[keys?.name] });
        }
      },
      [onChange, keys],
    );

    const handleOnChangeInput = useCallback(debounce(setSearch, SEARCH_DELAY_TIMEOUT), [setSearch]);

    return (
      <FilterSelect
        activeFilters={activeFilters}
        async
        defaultValue={defaultValue}
        keys={keys}
        onBackspacePress={onBackspacePress}
        onChange={handleOnChange}
        onClickAway={onClickAway}
        onSearch={handleOnChangeInput}
        options={data.data || dataShort}
      />
    );
  },
);
