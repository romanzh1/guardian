import { useCallback, useMemo, useState } from 'react';
import { BOOLEAN_OPTIONS, DEFAULT_KEYS } from 'src/constants';
import { Filter, FilterKey, KeysForOptions, OPERATORS, TypeComponentFilter } from '../types';

export const useFilter = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const changeFilter = useCallback(
    (v: Filter[] | ((prevState: Filter[]) => Filter[])): void => {
      setFilters(v);
    },
    [setFilters],
  );

  const generateFilters = useCallback(
    (filter: Record<string, unknown>, filterOptions: FilterKey[]) => {
      const filterKeys = Object.keys(filter);
      if (!filterKeys.length) {
        setFilters([]);
        return;
      }
      const mapOptions = new Map();
      filterOptions.forEach(item => {
        mapOptions.set(`${item.id}`, item);
      });

      const res: Filter[] = [];
      filterKeys.forEach(item => {
        if (mapOptions.has(item)) {
          const option = mapOptions.get(item);
          const parse = filter[item];
          if (parse) {
            if (typeof parse === 'object') {
              const newData = Object.entries(parse);
              const newOptions = OPERATORS[option.type].find(el => el.id === newData[0][0]);

              let newValue = newData[0][1];

              if (option.type === TypeComponentFilter.Boolean) {
                newValue = BOOLEAN_OPTIONS[Number(newData[0][1])];
              }
              res.push({ ...option, value: newValue, operator: newOptions });
            } else if (option.api) {
              res.push({ ...option, needReq: true, value: `${filter[item]}` });
            } else if (option.apiShort) {
              res.push({ ...option, needReq: true, value: `${filter[item]}` });
            } else if (option.type === TypeComponentFilter.Select) {
              const keyForItem = option?.keys?.id || DEFAULT_KEYS.id;

              const value = option.options.find((elem: any) => elem?.[keyForItem] === parse);
              res.push({ ...option, value });
            } else {
              let newValue: string | KeysForOptions = `${filter[item]}`;

              if (option.type === TypeComponentFilter.Boolean) {
                newValue = BOOLEAN_OPTIONS[Number(filter[item])];
              }
              res.push({ ...option, value: newValue });
            }
          }
        }
      });
      setFilters(res);
    },
    [setFilters],
  );
  return useMemo(
    () => ({
      filters,
      changeFilter,
      generateFilters,
    }),
    [filters, changeFilter, generateFilters],
  );
};
