import { LocalizationProvider, DateField as MDateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { KeyboardEvent, memo, useCallback } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const DateField = memo(({ value, onChange, handleKeyDown }: Props) => {
  const handleDateChange = useCallback(
    (date: Dayjs | null) => {
      if (date && date.isValid()) {
        const formattedDate = dayjs(date).format('DD.MM.YYYY');
        onChange(formattedDate);
      } else {
        onChange('');
      }
    },
    [onChange],
  );
  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs} dateFormats={{ keyboardDate: 'DD.MM.YYYY' }}>
      <MDateField
        inputProps={{ onKeyDown: handleKeyDown, autoFocus: true }}
        onChange={handleDateChange}
        value={dayjs(value, 'DD.MM.YYYY')}
      />
    </LocalizationProvider>
  );
});
