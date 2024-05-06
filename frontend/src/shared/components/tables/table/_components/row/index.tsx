import React, { memo, useCallback, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classnames from 'classnames';
import Typography from '@mui/material/Typography/Typography';
import { ExpandMore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { merge } from 'lodash';
import { ColumnType, GetColClassnamesType, GetRowClassnamesType, RecordType } from '../../types';
import cn from './index.module.scss';

const disableBorderSx = { border: 0 };
const INDENT = 6;

type PropsType<DataType extends RecordType> = {
  row: DataType;
  onRowClick?: (data: DataType, index: number) => void;
  columns: Array<ColumnType<DataType>>;
  tableId: string;
  index: number;
  getRowClassnames?: GetRowClassnamesType<DataType>;
  getColClassname?: GetColClassnamesType<DataType>;
  disableBorder?: boolean;
  actionForRender?: (data?: DataType) => void;
  details?: boolean;
  indentDetails?: number;
  checkedRow?: Array<DataType>;
};

const RowView = <DataType extends RecordType>({
  row,
  onRowClick,
  columns,
  tableId,
  index,
  getRowClassnames = () => ({}),
  getColClassname,
  disableBorder,
  actionForRender,
  details,
  indentDetails = 0,
  checkedRow,
}: PropsType<DataType>) => {
  const handleRowClick = useCallback(() => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  }, [index, onRowClick, row]);
  const { classNames, sx } = getRowClassnames(row);
  const sxCell = disableBorder ? disableBorderSx : undefined;
  const sxCellDetail = useMemo(() => ({ textIndent: indentDetails }), [indentDetails]);

  const [open, setOpen] = useState<boolean>(false);

  const getCellSx = useCallback(
    (ind?: number) => {
      if (!ind) {
        return merge(sxCell, sxCellDetail);
      }
      return sxCell;
    },
    [sxCell, sxCellDetail],
  );

  const handleShowDetail = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setOpen(prev => !prev);
    },
    [setOpen],
  );

  return (
    <>
      <TableRow
        aria-roledescription={`${tableId}-row`}
        className={classnames(cn.root, classNames, {
          [cn.root_clickable]: Boolean(onRowClick),
        })}
        hover
        onClick={handleRowClick}
        sx={sx}
      >
        {details && (
          <TableCell padding="none" sx={getCellSx()}>
            {!!row?.childrens?.length && (
              <IconButton onClick={handleShowDetail} size="small">
                <ExpandMore
                  className={classnames(cn.details, { [cn.details_isOpen]: open })}
                  color="secondary"
                  fontSize="inherit"
                />
              </IconButton>
            )}
          </TableCell>
        )}
        {columns.map(({ align, render, name, noPadding }, i) => {
          return (
            <TableCell
              key={name}
              align={align}
              aria-roledescription={`${tableId}-cell-${name}`}
              className={getColClassname && getColClassname(name)}
              padding={name === 'actions' || noPadding ? 'none' : 'normal'}
              sx={getCellSx(i)}
            >
              {render ? (
                render(row, index, actionForRender, checkedRow)
              ) : (
                <Typography display="block" variant="inherit">
                  {row[name]}
                </Typography>
              )}
            </TableCell>
          );
        })}
      </TableRow>
      {open &&
        !!row?.childrens?.length &&
        row.childrens.map((item: DataType, i: number) => (
          <RowView
            key={item.id}
            actionForRender={actionForRender}
            checkedRow={checkedRow}
            columns={columns}
            details={details}
            getColClassname={getColClassname}
            getRowClassnames={getRowClassnames}
            indentDetails={indentDetails + INDENT}
            index={index}
            onRowClick={onRowClick}
            row={item}
            tableId={tableId}
          />
        ))}
    </>
  );
};

export const Row = memo(RowView) as typeof RowView;
