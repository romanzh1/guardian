import React, { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead/TableHead';
import { OrderTypes, ColumnType, RecordType, GetColClassnamesType, SortEventType } from '../../types';
import { HeaderItem } from './_components/header-item';

type PropsType<T extends RecordType> = {
  columns: Array<ColumnType<T>>;
  sortDir?: OrderTypes;
  sortName?: string;
  onSort: ({ name, direction }: SortEventType) => void;
  id: string;
  getColClassname?: GetColClassnamesType<T>;
  details?: boolean;
};

const HeadersView = <DataType extends RecordType>({
  columns,
  sortDir = OrderTypes.ASC,
  sortName = '',
  onSort,
  id,
  getColClassname,
  details,
}: PropsType<DataType>) => {
  return (
    <TableHead>
      <TableRow>
        {details && (
          <HeaderItem
            cellClassName={getColClassname && getColClassname('details')}
            id={id}
            name="details"
            onSort={onSort}
            sortDir={sortDir}
            sortName={sortName}
            title=""
            width="30px"
          />
        )}
        {columns.map(({ title, align, width, name, minWidth, isSortable, headerTooltipText }) => (
          <HeaderItem
            key={name}
            alignRow={align}
            cellClassName={getColClassname && getColClassname(name)}
            headerTooltipText={headerTooltipText}
            id={id}
            isSortable={isSortable}
            minWidth={minWidth}
            name={name}
            onSort={onSort}
            sortDir={sortDir}
            sortName={sortName}
            title={title}
            width={width}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export const Headers = memo(HeadersView) as typeof HeadersView;
