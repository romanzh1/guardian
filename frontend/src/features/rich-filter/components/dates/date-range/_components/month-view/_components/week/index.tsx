import React, { memo } from 'react';
import { ButtonBase, Typography, useTheme } from '@mui/material';
import classNames from 'classnames';
import { isSameMonth, isBefore, isAfter, isSameDay, isToday } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PickersSlideTransition } from '@mui/x-date-pickers/DateCalendar/PickersSlideTransition';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styles from './index.module.scss';

export type TwoDateStrings = string;
export type TwoDates = [Date | null, Date | null];

const daySx = {
  alignItems: 'center',
  margin: '3px 0',
};

const getSelectedClass = (dateFrom: Date | null, dateTo: Date | null, day: Date): string => {
  const selectedFirst = dateFrom && isSameDay(day, dateFrom);
  const selectedLast = dateTo && isSameDay(day, dateTo);

  if (dateFrom && dateTo && selectedFirst && selectedLast) {
    return styles.dayInner_selectedSingle;
  }
  if (selectedFirst) {
    return styles.dayInner_selectedFirst;
  }
  if (selectedLast) {
    return styles.dayInner_selectedLast;
  }
  if (dateFrom && dateTo && isAfter(day, dateFrom) && isBefore(day, dateTo)) {
    return styles.dayInner_selectedMiddle;
  }

  return '';
};

type Props = {
  range: Array<Date>;
  d: Date;
  selectedRange: TwoDates;
  onChange: (date: Date) => void;
  slideDirection: 'left' | 'right';
  month: number;
};

export const Week = memo(({ range, d, selectedRange: [from, to], onChange, slideDirection, month }: Props) => {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slideNodeRef = React.useMemo(() => React.createRef<HTMLDivElement>(), [month]);

  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      <PickersSlideTransition
        className={styles.weekSlideTransition}
        nodeRef={slideNodeRef}
        reduceAnimations={false}
        slideDirection={slideDirection}
        transKey={month}
      >
        <div ref={slideNodeRef} className={styles.root}>
          {range.map(day => {
            if (!isSameMonth(day, d)) {
              return <div key={day.valueOf()} className={styles.day} />;
            }

            const today = isToday(day);
            const selectedClass = getSelectedClass(from, to, day);

            return (
              <div key={day.valueOf()} className={styles.day}>
                <ButtonBase
                  className={classNames(styles.dayInner, selectedClass)}
                  onClick={() => onChange(day)}
                  sx={[
                    daySx,
                    // Boolean(selectedClass) && { backgroundColor: theme.palette.richFilter.calendar.selectButton },
                  ]}
                >
                  <Typography
                    className={classNames(styles.dayNumber, {
                      [styles.dayNumber_today]: today,
                    })}
                    sx={[today && { color: 'white', backgroundColor: 'red' }]}
                    variant="text"
                  >
                    {day.getDate()}
                  </Typography>
                </ButtonBase>
              </div>
            );
          })}
        </div>
      </PickersSlideTransition>
    </LocalizationProvider>
  );
});
