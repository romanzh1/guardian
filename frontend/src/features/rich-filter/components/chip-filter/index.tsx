import React, { memo, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { Button } from 'src/shared/components';
import { Filter, FilterKey, FilterValue, TypeComponentFilter } from '../../types';
import styles from './index.module.scss';
import { FilterSelect } from '../filter-select';
import { ComponentMatcher } from '../component-matcher';
import { ChipValue } from './components';

type Props = {
  options: FilterKey[];
  activeFilters: Filter[];
  onBackspacePress: () => void;
  onClickAway: (e: MouseEvent | TouchEvent) => void;
  setActiveEditId: (id: number | null) => void;
  index?: number;
  filter?: Filter;
  isCreateNew?: boolean;
  activeEditId?: number | null;
  setFilter?: (value: Filter) => void;
  onSearch?: (search: string) => void;
  setFilterValue?: (value: FilterValue, index: number) => void;
  setFilterOperator?: (operator: Filter['operator'] | null, index: number) => void;
  onDeleteValue?: () => void;
};

const leftChipSx = {
  borderRadius: '4px 0 0 4px',
  backgroundColor: 'fieldItem.background',
  ':hover': {
    backgroundColor: 'fieldItem.background',
  },
};

const centerChipSx = {
  minWidth: 'auto',
  borderRadius: '0px',
  backgroundColor: 'fieldItem.background',
  ':hover': {
    backgroundColor: 'fieldItem.background',
  },
};

const typographySx = {
  ':hover': {
    color: 'primary.main',
  },
};

export const ChipFilter = memo(
  ({
    filter,
    options,
    activeFilters,
    onBackspacePress,
    onSearch,
    onClickAway,
    isCreateNew,
    setFilter,
    index,
    setFilterValue,
    activeEditId,
    setActiveEditId,
    setFilterOperator,
    onDeleteValue,
  }: Props) => {
    const [defaultValue, setDefaultValue] = useState<string>('');

    const handleSetFilter = useCallback(
      (item: FilterKey | Filter) => {
        if (setFilter) {
          setFilter({ ...item, value: '' });
          setActiveEditId(activeFilters.length);
        }
      },
      [setFilter, activeFilters, setActiveEditId],
    );

    const handleSetFilterValue = useCallback(
      (newValue: FilterValue) => {
        if (setFilterValue && index !== undefined) {
          setFilterValue(newValue, index);
          if (newValue) {
            setDefaultValue('');
          }
        }
      },
      [setFilterValue, index, setDefaultValue],
    );

    const handleSetFilterOperator = useCallback(
      (operator: Filter['operator'] | null) => {
        if (setFilterOperator && index !== undefined) {
          setFilterOperator(operator, index);
        }
      },
      [setFilterOperator, index],
    );

    const handleOnClickClose = useCallback(
      (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (filter?.type === TypeComponentFilter.Date) {
          handleSetFilterOperator(null);
        }
        if (onDeleteValue) {
          onDeleteValue();
        }
      },
      [filter?.type, handleSetFilterOperator, onDeleteValue],
    );
    const handleOnClickRightChip = useCallback(() => {
      const newDefaultValue = typeof filter?.value === 'object' ? filter?.value?.name : filter?.value;
      setDefaultValue(newDefaultValue || '');
      handleSetFilterValue('');
      setActiveEditId(index ?? null);
    }, [filter, setDefaultValue, handleSetFilterValue, setActiveEditId, index]);

    const handleOnClickOperator = useCallback(() => {
      if (setFilterOperator && typeof index === 'number') setFilterOperator(null, index);
    }, [setFilterOperator, index]);

    return (
      <div className={styles.root}>
        {filter && (
          <div className={styles.chipBlock}>
            <Button className={styles.label} sx={leftChipSx}>
              <Typography sx={typographySx} variant="text">
                {filter.name}
              </Typography>
            </Button>
            {filter.operator && (
              <Button className={styles.label} onClick={handleOnClickOperator} sx={centerChipSx}>
                <Typography sx={typographySx} variant="text">
                  {filter.operator.name}
                </Typography>
              </Button>
            )}
            {filter.value && (
              <ChipValue
                filter={filter}
                onClick={handleOnClickRightChip}
                onClickClose={handleOnClickClose}
                setFilter={handleSetFilterValue}
              />
            )}
          </div>
        )}
        {!filter && isCreateNew && (
          <FilterSelect
            activeFilters={activeFilters}
            onBackspacePress={onBackspacePress}
            onChange={handleSetFilter}
            onClickAway={onClickAway}
            onSearch={onSearch}
            options={options}
          />
        )}
        {(isCreateNew || activeEditId === index) && filter && (
          <ComponentMatcher
            activeFilters={activeFilters}
            defaultValue={defaultValue}
            filter={filter}
            onBackspacePress={onBackspacePress}
            onChange={handleSetFilterValue}
            onChangeOperator={handleSetFilterOperator}
            onClickAway={onClickAway}
          />
        )}
      </div>
    );
  },
);
