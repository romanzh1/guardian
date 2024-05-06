import { memo } from 'react';
import { useController } from 'react-hook-form';
import { Input } from 'src/shared/components';

type Props = {
  fieldName: string;
  label?: string;
  multiline?: boolean;
  rows?: number;
  isStandard?: boolean;
  placeholder?: string;
  helperText?: boolean;
  disabled?: boolean;
  required?: boolean;
  isNumber?: boolean;
};

export const ControllerInput = memo(
  ({ fieldName, helperText, isStandard, disabled, isNumber, label, required, rows, multiline, placeholder }: Props) => {
    const style = isNumber
      ? {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            display: 'none',
          },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
        }
      : undefined;

    const { field, fieldState } = useController<{ name: string }, 'name'>({ name: fieldName as 'name' });
    const { ref, ...fieldProps } = field;

    if (isStandard) {
      return (
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...fieldProps}
          error={Boolean((fieldState.isTouched && fieldState.error) || fieldState.invalid)}
          fullWidth
          helperText={
            helperText &&
            ((fieldState.error && fieldState.invalid) || (fieldState.error && fieldState.isTouched)
              ? fieldState.error.message
              : ' ')
          }
          inputRef={ref}
          label={label}
          placeholder={placeholder}
          size="small"
        />
      );
    }

    return (
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fieldProps}
        disabled={disabled}
        error={Boolean((fieldState.isTouched && fieldState.error) || fieldState.invalid)}
        errorText={fieldState.error ? fieldState.error.message : ''}
        fullWidth
        inputRef={ref}
        label={label}
        multiline={multiline}
        placeholder={placeholder}
        required={required}
        rows={rows}
        size="small"
        sx={style}
        type={isNumber ? 'number' : 'text'}
      />
    );
  },
);
