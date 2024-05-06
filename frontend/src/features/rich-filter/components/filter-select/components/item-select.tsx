import React, { memo, useCallback } from 'react';
import { Typography, useTheme } from '@mui/material';
import { RecordType } from 'src/shared/components/tables/table/types';
import { DEFAULT_KEYS } from 'src/constants';
import { MenuItem } from 'src/shared/components';
import { KeysForOptions } from '../../../types';

type Props<T extends RecordType> = {
  item: T;
  index: number;
  activeIndex: number | null;
  keys?: KeysForOptions;
  onClick: (item: T) => void;
};
const Item = <T extends RecordType>({ item, index, activeIndex, keys = DEFAULT_KEYS, onClick }: Props<T>) => {
  const theme = useTheme();

  const handleOnClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <MenuItem
      onClick={handleOnClick}
      sx={{
        background: index === activeIndex ? theme.palette.listItem.hoverBackground : undefined,
      }}
    >
      <Typography variant="text">{item?.[keys.name]}</Typography>
    </MenuItem>
  );
};

export const ItemSelect = memo(Item) as typeof Item;
