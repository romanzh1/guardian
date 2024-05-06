import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { FilterSelect } from '../../../filter-select';
import { Filter, FilterValue, OPERATORS } from '../../../../types';

type Props = {
  filter: Filter;
  onBackspacePress: () => void;
  onChange?: (operator: Filter['operator'] | null) => void;
  defaultValue?: string;
};

export const Operators = memo(({ filter, onChange, onBackspacePress, defaultValue }: Props) => {
  const onClickAway = useCallback(() => {}, []);

  const handleSetOperator = useCallback(
    (operator: FilterValue) => {
      if (onChange) {
        if (typeof operator !== 'string') {
          onChange(operator);
        }
      }
    },
    [onChange],
  );

  const options = useMemo(() => {
    return OPERATORS[filter.type] || [];
  }, [filter]);

  useEffect(() => {
    if (options.length === 1) {
      handleSetOperator(options[0]);
    }
  }, [options, handleSetOperator]);

  return (
    <FilterSelect
      defaultValue={defaultValue}
      onBackspacePress={onBackspacePress}
      onChange={handleSetOperator}
      onClickAway={onClickAway}
      options={options}
    />
  );
});
