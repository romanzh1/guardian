import { ClickAwayListener } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClickAway: (e: TouchEvent | MouseEvent) => void;
  onBackspacePress: () => void;
  defaultValue?: string;
};

export const DateCalendar = memo(({ value, onChange, onClickAway, onBackspacePress, defaultValue }: Props) => {
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(
    dayjs(dayjs(value).isValid() ? dayjs(value) : undefined),
  );

  const handleDateAccept = useCallback(
    (date: Dayjs | null) => {
      if (date && date.isValid()) {
        const formattedDate = dayjs(date).format('DD.MM.YYYY');
        setDatePickerValue(date);
        onChange(formattedDate);
      } else {
        onChange('');
      }
    },
    [onChange],
  );

  const handleDateChange = useCallback((date: Dayjs | null) => {
    setDatePickerValue(date);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && datePickerValue?.isValid()) {
        e.preventDefault();
        const formattedDate = dayjs(datePickerValue).format('DD.MM.YYYY');
        onChange(formattedDate);
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspacePress();
      }
    },
    [onChange, onBackspacePress, datePickerValue],
  );

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    if (defaultValue) setDatePickerValue(dayjs(defaultValue, 'DD.MM.YYYY'));
  }, [defaultValue]);

  return (
    <div className={styles.input}>
      <ClickAwayListener onClickAway={onClickAway}>
        <div ref={anchorRef}>
          <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
            <DatePicker
              autoFocus
              onAccept={handleDateAccept}
              onChange={handleDateChange}
              open={isVisible}
              slotProps={{ textField: { onKeyDown }, openPickerIcon: { sx: { display: 'none' } } }}
              value={datePickerValue}
            />
          </LocalizationProvider>
        </div>
      </ClickAwayListener>
    </div>
  );
});
