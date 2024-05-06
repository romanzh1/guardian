import React, { memo, useCallback, useMemo } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { RecordType } from 'src/shared/components/tables/table/types';

const TOOLTIP_ON = 'Отметить';
const TOOLTIP_OFF = 'Удалить';
const CHECKED_KEY = 'id';

type PropsCheckedRowButton<T> = {
  row: T;
  actionForRender?: (row: T, type?: string) => void;
  tooltip?: string;
  checkedRow?: Array<T>;
  checkedKey?: string;
};

const TYPE_ACTION = 'checked';

const CheckedRow = <T extends RecordType>({
  row,
  actionForRender,
  tooltip,
  checkedRow,
  checkedKey = CHECKED_KEY,
}: PropsCheckedRowButton<T>) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (actionForRender) actionForRender(row, TYPE_ACTION);
    },
    [row, actionForRender],
  );

  const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  }, []);

  const checked = useMemo(() => {
    if (checkedRow) {
      return !!checkedRow.find(item => item[checkedKey] === row[checkedKey]);
    }
    return false;
  }, [checkedRow, row, checkedKey]);

  const title = checked ? TOOLTIP_OFF : TOOLTIP_ON;
  const text = tooltip?.length ? tooltip : title;

  return (
    <Tooltip title={text}>
      <Checkbox checked={checked} onChange={onChange} onClick={onClick} size="small" sx={{ padding: 0 }} />
    </Tooltip>
  );
};

export const ActionsCheckedRow = memo(CheckedRow) as typeof CheckedRow;
