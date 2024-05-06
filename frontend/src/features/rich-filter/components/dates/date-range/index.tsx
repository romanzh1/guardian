import { isBefore } from 'date-fns';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { MonthView } from './_components/month-view';
import { TwoDates } from './_components/month-view/_components/week';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const DateRange = memo(({ value, onChange }: Props) => {
  const [range, setRange] = useState<TwoDates>([
    value.split(' - ')[0] ? dayjs(value.split(' - ')[0], 'DD.MM.YYYY').toDate() : null,
    value.split(' - ')[1] ? dayjs(value.split(' - ')[1], 'DD.MM.YYYY').toDate() : null,
  ]);

  useEffect(() => {
    const [from, to] = value.split(' - ');
    if (from && to) {
      setRange([dayjs(from, 'DD.MM.YYYY').toDate(), dayjs(to, 'DD.MM.YYYY').toDate()]);
    }
  }, [value]);

  const liveText = useMemo(() => {
    const [from, to] = range;
    return `${from ? dayjs(from).format('DD.MM.YYYY') : 'С'} - ${to ? dayjs(to).format('DD.MM.YYYY') : 'по'}`;
  }, [range]);

  const handleCheckDate = useCallback(
    (date: Date) => {
      const [from, to] = range;
      if ((from && to) || (!from && !to)) {
        setRange([date, null]);
      } else if (from) {
        setRange(isBefore(from, date) ? [from, date] : [date, from]);
      }
    },
    [range],
  );

  const handleSubmit = useCallback(() => {
    const [from, to] = range;
    if (from && to) {
      onChange(`${dayjs(from).format('DD.MM.YYYY')} - ${dayjs(to).format('DD.MM.YYYY')}`);
    }
  }, [onChange, range]);

  return (
    <div className={styles.root}>
      <div className={styles.dialogHead}>
        <Typography variant="text">
          <strong>{liveText}</strong>
        </Typography>
      </div>
      <div className={styles.content}>
        <MonthView count={2} onChange={handleCheckDate} selectedRange={range} />
      </div>
      <div className={styles.action}>
        <Button disabled={!range[0] || !range[1]} onClick={handleSubmit} variant="contained">
          Сохранить
        </Button>
      </div>
    </div>
  );
});
