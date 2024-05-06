import React, { memo, useCallback } from 'react';
import {
  MenuListProps,
  TablePagination as MuiTablePagination,
  PaperProps,
  TablePaginationProps,
  useTheme,
} from '@mui/material';
import { merge, set } from 'lodash';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from 'src/constants';

export const TablePagination = memo(
  ({ onPageChange, page, sx, SelectProps, rowsPerPage, count, ...restProps }: TablePaginationProps) => {
    const theme = useTheme();

    const defaultSx: TablePaginationProps['sx'] = {
      '& .MuiTablePagination-toolbar': {
        padding: '10px 16px 10px 0',
        minHeight: '24px',
      },
      '& .MuiTablePagination-selectLabel': {
        color: theme.palette.secondary.main,
        fontSize: '13px',
        margin: 0,
      },
      '& .MuiTablePagination-select': {
        fontSize: '13px',
      },
      '& .MuiTablePagination-displayedRows': {
        fontSize: '13px',
        margin: 0,
      },
      '& .MuiInputBase-root': {
        margin: '0px 10px 0px 8px',
      },
      '& .MuiTablePagination-actions': {
        marginLeft: '10px',
        '& .MuiIconButton-root': {
          padding: '0px',
        },
      },
    };

    const defaultPaperSx: PaperProps['sx'] = {
      borderRadius: `${theme.properties.borderRadius}px`,
    };

    const defaultMenuListSx: MenuListProps['sx'] = {
      padding: '8px',
      '.MuiMenuItem-root': {
        ':hover': { backgroundColor: theme.palette.menuItem.hover },
        minHeight: '30px',
        fontSize: '0.8125rem',
        padding: '6px 8px',
        '& .MuiSvgIcon-root': {
          height: '20px',
          width: '20px',
          color: theme.palette.menuItem.icon,
        },
        columnGap: '8px',
        borderRadius: `${theme.properties.borderRadius}px`,
        margin: '1px',
      },
    };

    const newSx = merge(defaultSx, sx);

    const newPaperSx = merge(defaultPaperSx, SelectProps?.MenuProps?.PaperProps);

    const newMenuListSx = merge(defaultMenuListSx, SelectProps?.MenuProps?.MenuListProps);

    const handleOnPageChange = useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onPageChange(e, newPage + 1);
      },
      [onPageChange],
    );

    const newSelectProps = { ...SelectProps };
    set(newSelectProps, 'MenuProps.PaperProps.sx', newPaperSx);
    set(newSelectProps, 'MenuProps.MenuListProps.sx', newMenuListSx);

    return (
      <MuiTablePagination
        component="div"
        count={count}
        labelDisplayedRows={({ from, to, count: countOnPage }) =>
          `${from}–${to} из ${countOnPage !== -1 ? countOnPage : `больше чем ${to}`}`
        }
        labelRowsPerPage="Отображать по:"
        onPageChange={handleOnPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
        SelectProps={newSelectProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        sx={newSx}
      />
    );
  },
);
