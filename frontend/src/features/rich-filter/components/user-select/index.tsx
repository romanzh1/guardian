import { Typography } from '@mui/material';
import { memo, useState } from 'react';
import { CircularPreloader, MenuItem } from 'src/shared/components';
import { RecordType } from 'src/shared/components/tables/table/types';
import styles from './index.module.scss';

export type KeysForOptions<T> = {
  id: keyof T;
  name: keyof T;
};

type Props<T extends RecordType> = {
  value: string;
  options?: T[];
  keys?: KeysForOptions<T>;
  isLoading?: boolean;
  onChange: (value: T) => void;
};

const DEFAULT_KEYS = {
  id: 'id',
  name: 'name',
};

const ListItems = <T extends RecordType>({
  options = [],
  keys = DEFAULT_KEYS,
  onChange,
  value,
  isLoading,
}: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.root}>
      <div>
        {isLoading && <CircularPreloader />}
        {!isLoading &&
          options &&
          options.map((item, index) => (
            <MenuItem
              key={item?.[keys.id]}
              onClick={() => onChange(item)}
              sx={theme => ({
                background: index === activeIndex ? theme.palette.listItem.hoverBackground : undefined,
              })}
            >
              <Typography variant="text">{item?.[keys.name]}</Typography>
            </MenuItem>
          ))}
        {value.length !== 0 && options && options.length === 0 && (
          <Typography sx={{ paddingX: 2, paddingY: 1 }}>Ничего не найдено</Typography>
        )}
      </div>
    </div>
  );
};

export const UserSelect = memo(ListItems) as typeof ListItems;
