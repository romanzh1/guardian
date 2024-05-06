import React, { memo, useCallback, MouseEvent, ChangeEventHandler } from 'react';
import TablePagination, { LabelDisplayedRowsArgs } from '@mui/material/TablePagination';
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

export const Pagination = memo(
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
      />
    );
  },
);
