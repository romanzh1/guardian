import React, { memo } from 'react';
import { Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';

const disableBorderSx = { border: 0 };

type PropsType = {
  columns: number;
  disableBorder?: boolean;
};

export const EmptyRow = memo(({ columns, disableBorder }: PropsType) => {
  return (
    <TableCell align="center" colSpan={columns} sx={disableBorder ? disableBorderSx : undefined}>
      <Typography variant="subtext">Нет информации</Typography>
    </TableCell>
  );
});
