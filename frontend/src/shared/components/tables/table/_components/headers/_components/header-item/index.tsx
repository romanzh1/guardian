import { memo, ReactNode, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { TableSortLabel, Tooltip, Typography, useTheme } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { TypographyWithTooltipWhenEllipsis } from 'src/shared/components/other/typography-with-tooltip-when-ellipsis';
import { AlignType, OrderTypes, SortEventType } from '../../../../types';
import styles from './index.module.scss';

type PropsType = {
  alignRow?: AlignType;
  sortDir: OrderTypes;
  sortName: string;
  title: string | ReactNode;
  onSort: ({ name, direction }: SortEventType) => void;
  width?: string;
  minWidth?: string;
  name: string;
  id: string;
  isSortable?: boolean;
  headerTooltipText?: string;
  cellClassName?: string;
};

export const HeaderItem = memo(
  ({
    alignRow = 'left',
    sortDir,
    title,
    sortName,
    onSort,
    width,
    minWidth,
    name,
    id,
    isSortable = true,
    headerTooltipText,
    cellClassName,
  }: PropsType) => {
    const theme = useTheme();
    const handleChangeSort = useCallback(() => {
      onSort({
        name,
        direction: name === sortName && sortDir === OrderTypes.DESC ? OrderTypes.ASC : OrderTypes.DESC,
      });
    }, [onSort, name, sortDir, sortName]);
    const content = useMemo(() => {
      return title ? (
        <TypographyWithTooltipWhenEllipsis noWrap variant="text">
          <strong>{title}</strong>
        </TypographyWithTooltipWhenEllipsis>
      ) : null;
    }, [title]);

    return (
      <TableCell
        align={alignRow}
        className={classnames(styles.root, cellClassName)}
        id={`${id}-header-${name}`}
        style={{
          width,
          minWidth,
        }}
        sx={{
          bgcolor: theme.palette.table.headerBackground,
          padding: '10px 16px',
          border: 'none',
          ':nth-of-type(n)': {
            borderRadius: 'unset',
          },
          ':first-of-type': {
            borderRadius: '8px 0 0 8px',
          },
          ':last-child': {
            borderRadius: '0 8px 8px 0',
          },
        }}
        variant="head"
      >
        {(title || headerTooltipText || isSortable) && (
          <div
            className={classnames(styles.cellInner, {
              [styles.cellInner_empty]: !title,
            })}
          >
            {headerTooltipText && (
              <Tooltip arrow title={<Typography variant="text">{headerTooltipText}</Typography>}>
                <div className={styles.iconBox}>
                  <HelpOutlineIcon fontSize="inherit" />
                </div>
              </Tooltip>
            )}
            {isSortable ? (
              <TableSortLabel
                active={sortName === name}
                className={styles.sortLabel}
                direction={sortName === name ? sortDir : OrderTypes.ASC}
                onClick={handleChangeSort}
                sx={{ width: '100%' }}
              >
                {content}
              </TableSortLabel>
            ) : (
              content
            )}
          </div>
        )}
      </TableCell>
    );
  },
);
