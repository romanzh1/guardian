import { memo, useCallback, useMemo, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  differenceInCalendarDays,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

import { PickersFadeTransitionGroup } from '@mui/x-date-pickers/DateCalendar/PickersFadeTransitionGroup';
import styles from './index.module.scss';
import { TwoDates, Week } from './_components/week';

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const DAYS_OF_WEEK_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type Ranges = Array<{
  month: number;
  year: number;
  startDate: Date;
  days: Array<Date>;
}>;

type Props = {
  selectedRange: TwoDates;
  onChange: (date: Date) => void;
  count: number;
};

export const MonthView = memo(({ selectedRange: [from], selectedRange, onChange, count }: Props) => {
  const [innerDate, setD] = useState<{ d: Date; slideDirection: 'left' | 'right' }>({
    d: from || new Date(),
    slideDirection: 'left',
  });

  const incMonth = useCallback(() => {
    setD(v => ({
      d: addMonths(v.d, 1),
      slideDirection: 'left',
    }));
  }, []);
  const decMonth = useCallback(() => {
    setD(v => ({
      d: subMonths(v.d, 1),
      slideDirection: 'right',
    }));
  }, []);

  const ranges = useMemo<Ranges>(() => {
    const { d } = innerDate;

    return new Array(count).fill([]).map((_, index) => {
      const startDate = index ? addMonths(d, index) : d;
      const start = startOfWeek(startOfMonth(startDate), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(startDate), { weekStartsOn: 1 });

      const days = [];
      const dayCount = differenceInCalendarDays(end, start);

      for (let i = 0; i <= dayCount; i += 1) {
        days.push(addDays(start, i));
      }

      return {
        month: startDate.getMonth(),
        year: startDate.getFullYear(),
        startDate,
        days,
      };
    });
  }, [count, innerDate]);

  const countArray = new Array(count).fill(0).map((_, index) => index);

  return (
    <div className={styles.root}>
      <div className={styles.multiMonths}>
        <div className={styles.scrollButton}>
          <IconButton edge="start" onClick={decMonth}>
            <ChevronLeft />
          </IconButton>
        </div>
        {countArray.map(key => {
          const range = ranges[key];

          return (
            <div key={key} className={styles.month}>
              <div className={styles.head}>
                <PickersFadeTransitionGroup reduceAnimations={false} transKey={range.month}>
                  <Typography>
                    <strong>
                      {MONTH_NAMES[range.month]} {range.year}
                    </strong>
                  </Typography>
                </PickersFadeTransitionGroup>
              </div>
              <div className={styles.weekDayNames}>
                {DAYS_OF_WEEK_NAMES.map(day => (
                  <Typography key={day} className={styles.weekDayName}>
                    {day}
                  </Typography>
                ))}
              </div>
              <div className={styles.weekWrap}>
                <Week
                  d={range.startDate}
                  month={range.month}
                  onChange={onChange}
                  range={range.days}
                  selectedRange={selectedRange}
                  slideDirection={innerDate.slideDirection}
                />
              </div>
            </div>
          );
        })}
        <div className={styles.scrollButton}>
          <IconButton edge="end" onClick={incMonth}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
});
