import React, { memo, ReactNode } from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import styles from './index.module.scss';

const disableBorderSx = { border: 0 };

type PropsType = {
  columns?: number;
  disableBorder?: boolean;
  emptyContent?: ReactNode;
  hover?: boolean;
};

export const TableEmptyRow = memo(({ disableBorder, emptyContent, hover, columns }: PropsType) => {
  return (
    <TableRow hover={hover}>
      <TableCell align="center" colSpan={columns} sx={disableBorder ? disableBorderSx : undefined}>
        {emptyContent ? (
          <div className={styles.empty}>{emptyContent}</div>
        ) : (
          <Typography variant="text">Нет информации</Typography>
        )}
      </TableCell>
    </TableRow>
  );
});
