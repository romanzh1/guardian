import React, { memo, useEffect, useMemo } from 'react';
import { Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { merge } from 'lodash';
import { Filter, FilterValue } from 'src/features/rich-filter/types';
import { Button } from 'src/shared/components';
import { DEFAULT_KEYS } from 'src/constants';
import { RecordType } from 'src/shared/components/tables/table/types';
import styles from '../index.module.scss';

const rightChipSx = {
  borderRadius: '0 4px 4px 0',
  backgroundColor: 'fieldItem.background',
  ':hover': {
    backgroundColor: 'fieldItem.background',
  },
};

const typographySx = {
  ':hover': {
    color: 'primary.main',
  },
};

type Props = {
  filter: Filter;
  onClick: () => void;
  setFilter: (value: FilterValue) => void;
  onClickClose: (e: React.MouseEvent<SVGSVGElement>) => void;
};

export const ChipValue = memo(({ filter, onClickClose, onClick, setFilter }: Props) => {
  const value = useMemo(() => {
    if (filter.needReq) return '';
    return typeof filter?.value === 'object' ? filter.value?.name : filter.value;
  }, [filter]);
  const id = useMemo(() => {
    return typeof filter?.value === 'object' ? filter.value?.id : filter.value;
  }, [filter]);
  const req = filter?.apiReq && filter?.apiReq({ id }, { enabled: !!filter?.needReq });
  useEffect(() => {
    if (req && req?.data) {
      if (req?.data && !!filter?.needReq) {
        const data = req?.data as RecordType;
        const name = data?.[filter?.keys ? filter.keys.name : DEFAULT_KEYS.name];
        setFilter({ id, name });
      }
    }
  }, [filter, req, setFilter, id]);

  return (
    <Button
      autoFocus
      className={styles.label}
      endIcon={<Close onClick={onClickClose} sx={{ fill: 'primary.main' }} />}
      isLoading={filter?.needReq ? req?.isLoading : false}
      onClick={onClick}
      sx={rightChipSx}
    >
      <Typography sx={merge(typographySx, { fontWeight: 500 })} variant="text">
        {value}
      </Typography>
    </Button>
  );
});
