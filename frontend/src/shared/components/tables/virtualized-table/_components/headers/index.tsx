import React, { memo } from 'react';
import TableRow from '@mui/material/TableRow';
import { SortEventType } from 'src/shared/hooks';
import { OrderTypes, ColumnType, RecordType, GetColClassnamesType } from '../../types';
import { HeaderItem } from './_components/header-item';

type PropsType<T extends RecordType> = {
  columns: Array<ColumnType<T>>;
  sortDir?: OrderTypes;
  sortName?: string;
  onSort: ({ name, direction }: SortEventType) => void;
  id: string;
  getColClassname?: GetColClassnamesType<T>;
};

const HeadersView = <DataType extends RecordType>({
  columns,
  sortDir = OrderTypes.ASC,
  sortName = '',
  onSort,
  id,
  getColClassname,
}: PropsType<DataType>) => {
  return (
    <TableRow>
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
  );
};

export const Headers = memo(HeadersView) as typeof HeadersView;
