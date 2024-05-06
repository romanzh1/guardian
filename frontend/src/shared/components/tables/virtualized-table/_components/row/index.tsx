import React, { memo } from 'react';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography/Typography';
import { ColumnType, GetColClassnamesType, RecordType } from '../../types';

const disableBorderSx = { border: 0 };

type PropsType<DataType extends RecordType> = {
  setHeight?: (el: number) => void;
  row: DataType;
  columns: Array<ColumnType<DataType>>;
  tableId: string;
  index: number;
  totalCount: number;
  getColClassname?: GetColClassnamesType<DataType>;
  disableBorder?: boolean;
};

const RowView = <DataType extends RecordType>({
  row,
  totalCount,
  setHeight,
  columns,
  tableId,
  index,
  getColClassname,
  disableBorder,
}: PropsType<DataType>) => {
  /* const curRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
    if (curRef !== null && totalCount < 10) {
      if (curRef.current!.clientHeight > 80) {
        setHeight(curRef.current!.clientHeight + 5);
      } else setHeight(curRef.current!.clientHeight);
    }
  }, [setHeight, totalCount]); */
  return (
    <>
      {columns.map(({ align, render, name, noPadding }) => {
        return (
          <TableCell
            key={name}
            align={align}
            aria-roledescription={`${tableId}-cell-${name}`}
            className={getColClassname && getColClassname(name)}
            padding={name === 'actions' || noPadding ? 'none' : 'normal'}
            sx={disableBorder ? disableBorderSx : undefined}
          >
            {render ? (
              render(row, index)
            ) : (
              <Typography display="block" variant="inherit">
                {row[name]}
              </Typography>
            )}
          </TableCell>
        );
      })}
    </>
  );
};

export const Row = memo(RowView) as typeof RowView;
