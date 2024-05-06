import { TableCell, TableCellProps } from '@mui/material';
import React, { memo } from 'react';

type Props = TableCellProps;
export const CustomTableCell = memo(({ ...rest }: Props) => {
  return (
    <TableCell
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      sx={{
        border: 'none',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        padding: '8px 16px',
      }}
    />
  );
});
