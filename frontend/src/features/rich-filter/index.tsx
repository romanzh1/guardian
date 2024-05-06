import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Input } from 'src/shared/components';
import styles from './index.module.scss';
import { Filter, FilterKey, FilterValue } from './types';
import { ChipFilter } from './components/chip-filter';

type Props = {
  filters: Filter[];
  options: FilterKey[];
  setFilters: (filters: Filter[] | ((prevState: Filter[]) => Filter[])) => void;
  onSearch?: (value: string) => void;
  onDeleteFilter?: (value: Filter) => void;
};

export const RichFilter = memo(({ options, setFilters, filters, onSearch, onDeleteFilter }: Props) => {
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [activeEditId, setActiveEditId] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const setFilterValue = useCallback(
    (newValues: FilterValue, index: number) => {
      setFilters(prev => {
        return prev.map((filter, i) =>
          i === index ? { ...filter, needReq: filter.needReq ? false : filter.needReq, value: newValues } : filter,
        );
      });
      setActiveEditId(null);
      boxRef.current?.focus();
      if (index === filters.length - 1) {
        setIsCreateNew(true);
      }
    },
    [setFilters, setActiveEditId, filters],
  );
  const setFilterOperator = useCallback(
    (operator: Filter['operator'] | null, index: number) => {
      setFilters(prev => {
        return prev.map((filter, i) => (i === index ? { ...filter, operator } : filter));
      });
      boxRef.current?.focus();
    },
    [setFilters],
  );

  const onBackspacePress = useCallback(() => {
    if (filters.length) {
      if (onDeleteFilter) {
        const filterDelete = filters.find((_, i) => i === activeEditId) || filters[filters.length - 1];
        onDeleteFilter(filterDelete);
      }
      if (activeEditId !== null) {
        const newFilters = filters.filter((_, i) => i !== activeEditId);
        setFilters(newFilters);
        setActiveEditId(null);
        setIsCreateNew(true);
      } else {
        const lastIndex = filters.length - 1;
        const newFilters = [...filters];
        // newFilters[lastIndex] = { ...newFilters[lastIndex], value: '' };
        // setFilters(newFilters);
        newFilters.slice(0, lastIndex);
        setActiveEditId(lastIndex);
        setIsCreateNew(false);
      }
      boxRef.current?.focus();
    }
  }, [setFilters, filters, onDeleteFilter, activeEditId]);

  const handleSearchFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.stopPropagation();
      if (e.target === boxRef.current) {
        if (filters?.[filters.length - 1]?.value || filters.length === 0) {
          setIsCreateNew(true);
          setActiveEditId(null);
        } else {
          setIsCreateNew(false);
          setActiveEditId(filters.length - 1);
        }
      }
    },
    [filters],
  );
  const handleSearchClick = useCallback(() => {
    if (filters?.[filters.length - 1]?.value || filters.length === 0) {
      setIsCreateNew(true);
      setActiveEditId(null);
    } else {
      setIsCreateNew(false);
      setActiveEditId(filters.length - 1);
    }
  }, [filters]);

  const handleNewChip = useCallback(
    (value: Filter) => {
      setIsCreateNew(false);
      const newValue = [...filters, value];
      setFilters(newValue);
    },
    [setFilters, filters],
  );

  const handleNewChipClickAway = useCallback((e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setIsCreateNew(false);
    setActiveEditId(null);
  }, []);

  useEffect(() => {
    if (activeEditId !== null) setIsCreateNew(false);
  }, [activeEditId]);

  function removeItemFromValues(arr: Filter[], index: number): Filter[] {
    const left = arr.slice(0, index);
    const right = arr.slice(index + 1);
    return left.concat(right);
  }
  return (
    <div className={styles.root}>
      <Box
        ref={boxRef}
        className={styles.search}
        onClick={handleSearchFocus}
        sx={theme => ({ border: `1px solid ${theme.palette.secondary.main}` })}
      >
        {filters.map((filter, index) => {
          const handleValueDelete = () => {
            setFilters(removeItemFromValues(filters, index));
            if (onDeleteFilter) {
              onDeleteFilter(filter);
            }
          };
          return (
            <ChipFilter
              // eslint-disable-next-line
              key={`${filter.id}${index}`}
              activeEditId={activeEditId}
              activeFilters={filters}
              filter={filter}
              index={index}
              onBackspacePress={onBackspacePress}
              onClickAway={handleNewChipClickAway}
              onDeleteValue={handleValueDelete}
              onSearch={onSearch}
              options={options}
              setActiveEditId={setActiveEditId}
              setFilterOperator={setFilterOperator}
              setFilterValue={setFilterValue}
            />
          );
        })}
        {isCreateNew && (
          <ChipFilter
            activeFilters={filters}
            isCreateNew={isCreateNew}
            onBackspacePress={onBackspacePress}
            onClickAway={handleNewChipClickAway}
            onSearch={onSearch}
            options={options}
            setActiveEditId={setActiveEditId}
            setFilter={handleNewChip}
          />
        )}
        {!isCreateNew && filters.length === 0 && (
          <div className={styles.input}>
            <Input autoComplete="off" onFocus={handleSearchClick} placeholder="Поиск и фильтр" />
          </div>
        )}
      </Box>
    </div>
  );
});
