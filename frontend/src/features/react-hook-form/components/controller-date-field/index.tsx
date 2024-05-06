import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { DatePicker } from 'src/shared/components';

type Props = {
  fieldName: string;
  valueName: string;
  format: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const ControllerDateField = memo(({ fieldName, valueName, fullWidth, ...props }: Props) => {
  const { setValue } = useFormContext();

  const { field, fieldState } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
  const { ref, ...fieldProps } = field;

  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(null);

  const handleOnChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      setDatePickerValue(date);
      if (date && date.isValid()) {
        setValue(valueName as string, date.toISOString(), {
          shouldTouch: true,
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setValue(valueName as string, null, { shouldTouch: true, shouldValidate: true, shouldDirty: true });
      }
    },
    [setValue, valueName],
  );

  return (
    <DatePicker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...fieldProps}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      errorText={fieldState.error && fieldState.isTouched ? fieldState.error.message : ''}
      fullWidth
      inputRef={field.ref}
      onChange={handleOnChange}
      value={datePickerValue}
    />
  );
});
