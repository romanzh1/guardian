import React, { memo, useCallback } from 'react';
import { BOOLEAN_OPTIONS } from 'src/constants';
import { Filter, FilterValue, TypeComponentFilter } from '../../types';
import { AsyncSelect } from '../async-select';
import { FilterInput } from '../filter-input';
import { Operators } from './components/operators';
import { FilterSelect } from '../filter-select';
import { DateCalendar } from '../dates/date-calendar';

type Props = {
  filter: Filter;
  activeFilters: Filter[];
  onBackspacePress: () => void;
  onChange: (filter: FilterValue) => void;
  onClickAway: (e: TouchEvent | MouseEvent) => void;
  defaultValue?: string;
  defaultOperator?: string;
  onChangeOperator?: (operator: Filter['operator'] | null) => void;
};

export const ComponentMatcher = memo(
  ({
    activeFilters,
    filter,
    onBackspacePress,
    onChange,
    onClickAway,
    onChangeOperator,
    defaultValue,
    defaultOperator,
  }: Props) => {
    const handleOnBackspacePress = useCallback(() => {
      if (filter.operator) {
        if (onChangeOperator) {
          onChangeOperator(null);
        }
      } else {
        onBackspacePress();
      }
    }, [onBackspacePress, onChangeOperator, filter.operator]);

    if (filter.hasOperators && !filter.operator) {
      return (
        <Operators
          defaultValue={defaultOperator}
          filter={filter}
          onBackspacePress={handleOnBackspacePress}
          onChange={onChangeOperator}
        />
      );
    }

    switch (filter.type) {
      case TypeComponentFilter.Select:
        return filter.api && filter.apiShort ? (
          <AsyncSelect
            activeFilters={activeFilters}
            api={filter.api}
            apiShort={filter.apiShort}
            defaultValue={defaultValue}
            keys={filter?.keys}
            onBackspacePress={onBackspacePress}
            onChange={onChange}
            onClickAway={onClickAway}
          />
        ) : (
          <FilterSelect
            activeFilters={activeFilters}
            defaultValue={defaultValue}
            keys={filter?.keys}
            onBackspacePress={onBackspacePress}
            onChange={onChange}
            onClickAway={onClickAway}
            options={filter?.options || []}
          />
        );
      case TypeComponentFilter.Text:
      case TypeComponentFilter.Number:
      case TypeComponentFilter.IP:
        return (
          <FilterInput defaultValue={defaultValue} onBackspacePress={handleOnBackspacePress} onChange={onChange} />
        );
      case TypeComponentFilter.Boolean:
        return (
          <FilterSelect
            keys={{
              id: 'id',
              name: 'name',
            }}
            onBackspacePress={onBackspacePress}
            onChange={onChange}
            onClickAway={onClickAway}
            options={BOOLEAN_OPTIONS}
          />
        );
      case TypeComponentFilter.Date:
        return (
          <DateCalendar
            defaultValue={defaultValue}
            onBackspacePress={handleOnBackspacePress}
            onChange={onChange}
            onClickAway={onClickAway}
            value={String(filter?.value)}
          />
        );
      default:
        return <div />;
    }
  },
);
