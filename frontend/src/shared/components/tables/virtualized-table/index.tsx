import React, { memo, useMemo } from 'react';
import { TableBody, TableContainer, Table as MaterialUiTable, Box, TableHead, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { TableVirtuoso } from 'react-virtuoso';
import TableCell from '@mui/material/TableCell';
import { DEFAULT_ROWS_PER_PAGE_OPTIONS, INIT_PAGE_LIMIT } from 'src/constants';
import { SortEventType } from 'src/shared/hooks';
import { noop } from 'src/shared/utils';
import { PaginationTable } from 'src/shared/components/other/pagination-table';
import { OrderTypes, ColumnType, RecordType, GetRowKeyType, GetColClassnamesType } from './types';
import cn from './index.module.scss';
import { Headers, Row, EmptyRow } from './_components';

const TableComponents = {
  // eslint-disable-next-line react/no-unstable-nested-components
  Scroller: React.forwardRef<HTMLDivElement, React.ComponentProps<typeof TableContainer>>((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableContainer {...props} ref={ref} />
  )),
  Table: MaterialUiTable,
  TableHead,
  TableRow,
  // eslint-disable-next-line react/no-unstable-nested-components
  TableBody: React.forwardRef<HTMLTableSectionElement, React.ComponentProps<typeof TableBody>>((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TableBody {...props} ref={ref} />
  )),
};

export type TableProps<T extends RecordType> = {
  columns: Array<ColumnType<T>>;
  data: Array<T>;
  count?: number;
  id: string;
  rowKey: keyof T | GetRowKeyType<T>;
  page?: number;
  onSetPage?: (nextPage: number) => void;
  rowsPerPage?: number;
  onSetRowsPerPage?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: Array<{ value: number; label: string }>;
  sortDir?: OrderTypes;
  sortName?: string;
  onSort?: ({ name, direction }: SortEventType) => void;
  disableFooter?: boolean;
  getColClassname?: GetColClassnamesType<T>;
};

const TableWrapper = <T extends RecordType>({
  columns,
  data,
  page = 0,
  onSetPage = noop,
  rowsPerPage = INIT_PAGE_LIMIT,
  onSetRowsPerPage = noop,
  count = 0,
  sortDir,
  sortName,
  onSort = noop,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  rowKey,
  id,
  disableFooter,
  getColClassname,
}: TableProps<T>) => {
  const getRowKey = useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (row: T) => `${row[rowKey]}`;
  }, [rowKey]);

  /* const [height, setHeight] = useState(48);
  const handleHeightAdd = useCallback((el: number) => {
    setHeight(prevState => prevState + el);
  }, []);
*/
  return (
    <Box className={cn.root}>
      {data.length <= 10 ? (
        <TableContainer>
          <MaterialUiTable>
            <TableHead>
              <Headers
                columns={columns}
                getColClassname={getColClassname}
                id={id}
                onSort={onSort}
                sortDir={sortDir}
                sortName={sortName}
              />
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={getRowKey(row)}>
                  <Row
                    key={getRowKey(row)}
                    columns={columns}
                    disableBorder={disableFooter && index === data.length - 1}
                    getColClassname={getColClassname}
                    index={index}
                    row={row}
                    tableId={id}
                    totalCount={data.length}
                  />
                </TableRow>
              ))}
              {!data.length && (
                <TableRow>
                  <EmptyRow columns={columns.length} disableBorder={disableFooter} />
                </TableRow>
              )}
            </TableBody>
          </MaterialUiTable>
        </TableContainer>
      ) : (
        <TableVirtuoso
          alignToBottom
          components={TableComponents}
          data={data}
          // eslint-disable-next-line react/no-unstable-nested-components
          fixedHeaderContent={() => (
            <Headers
              columns={columns}
              getColClassname={getColClassname}
              id={id}
              onSort={onSort}
              sortDir={sortDir}
              sortName={sortName}
            />
          )}
          // eslint-disable-next-line react/no-unstable-nested-components
          itemContent={(index, row) =>
            data.length > 0 ? (
              <Row
                key={getRowKey(row)}
                columns={columns}
                disableBorder={disableFooter && index === data.length - 1}
                getColClassname={getColClassname}
                index={index}
                row={row}
                tableId={id}
                totalCount={data.length}
              />
            ) : (
              <TableCell align="center" colSpan={columns.length}>
                <Typography variant="subtext">Нет информации</Typography>
              </TableCell>
            )
          }
          style={{
            // minHeight: data.length < 10 ? `${height}px` : 'calc(100vh - 370px)',
            height: 'calc(100vh - 370px)',
            width: '100%',
            borderRadius: '8px',
          }}
          totalCount={data.length}
        />
      )}
      {count !== 0 && !disableFooter && (
        <PaginationTable
          count={count}
          id={id}
          onSetPage={onSetPage}
          onSetPerPage={onSetRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </Box>
  );
};

export const VirtualizedTable = memo(TableWrapper) as typeof TableWrapper;
