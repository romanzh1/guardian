import { DatePicker as MuiDatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers';
import React, { memo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/extensions
import 'dayjs/locale/ru';
import { Dayjs } from 'dayjs';
import { Input } from '../input';

type Props = DatePickerProps<Dayjs> & {
  format: string;
  helperText?: string;
  errorText?: string;
  hint?: string;
  fullWidth?: boolean;
};

export const DatePicker = memo(({ format, helperText, errorText, hint, fullWidth, ...restProps }: Props) => {
  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs} dateFormats={{ keyboardDate: format }}>
      <MuiDatePicker
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        slotProps={{
          textField: ({ slotProps, ...params }) => ({
            // eslint-disable-next-line react/jsx-props-no-spreading
            ...params,
            helperText,
            hint,
            errorText,
            fullWidth,
          }),
        }}
        slots={{ textField: Input }}
      />
    </LocalizationProvider>
  );
});
