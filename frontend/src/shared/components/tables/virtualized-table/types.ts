import { SxProps } from '@mui/system';
import { ReactNode } from 'react';

export type RecordType = Record<string, any>;

export type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortEventType = {
  name: string;
  direction: OrderTypes;
};

export type ColumnType<T extends RecordType> = {
  title: string;
  name: string;
  align?: AlignType;
  render?: (data: T, index: number) => ReactNode;
  width?: string;
  minWidth?: string;
  isSortable?: boolean;
  headerTooltipText?: string;
  noPadding?: boolean;
  isPermanent?: boolean;
  initialEnabled?: boolean;
};

export type ColumnsType<T extends RecordType> = Array<ColumnType<T>>;

export type GetRowKeyType<T> = (row: T) => string | number;
export type GetRowClassnamesType<T> = (row: T) => {
  classNames?: string;
  sx?: SxProps;
};
export type GetColClassnamesType<T> = (name: keyof T) => string;

export type CellFilterType = {
  values: Array<{ id: string; name: ReactNode }>;
  selectedValues: Array<string>;
  onChange: (name: string, values: Array<string>) => void;
};

export type TableFilterType<T> = { [k in keyof T | string]?: CellFilterType };
