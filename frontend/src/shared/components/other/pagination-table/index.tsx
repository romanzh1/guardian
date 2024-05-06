import React, { memo, useCallback, MouseEvent, ChangeEventHandler } from 'react';
import TablePagination, { LabelDisplayedRowsArgs } from '@mui/material/TablePagination';
import { MenuListProps, useTheme } from '@mui/material';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from 'src/constants';
import { PaginationAction } from './_components/pagination-actions';

const getLabelDisplayedRows = ({ count, from, to }: LabelDisplayedRowsArgs) => `${from} — ${to} из ${count}`;

type PropsType = {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: Array<{ value: number; label: string }>;
  id: string;
  onSetPage: (newPage: number) => void;
  onSetPerPage: (perPage: number) => void;
};

export const PaginationTable = memo(
  ({
    count,
    onSetPage,
    onSetPerPage,
    page,
    rowsPerPage,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    id,
  }: PropsType) => {
    const handleChangePage = useCallback(
      (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onSetPage(newPage + 1);
      },
      [onSetPage],
    );
    const handleChangeRowsPerPage = useCallback<ChangeEventHandler<HTMLInputElement>>(
      event => {
        onSetPerPage(parseInt(event.target.value, 10));
      },
      [onSetPerPage],
    );
    const theme = useTheme();

    const defaultMenuListSx: MenuListProps['sx'] = {
      '.MuiPaper-root': {
        borderRadius: '6px',
      },
      '.MuiMenu-list': {
        padding: '8px',
      },
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

    return (
      <TablePagination
        ActionsComponent={PaginationAction}
        component="div"
        count={count}
        id={id}
        labelDisplayedRows={getLabelDisplayedRows}
        labelRowsPerPage="Отображать по"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        SelectProps={{
          MenuProps: { sx: defaultMenuListSx },
        }}
      />
    );
  },
);
