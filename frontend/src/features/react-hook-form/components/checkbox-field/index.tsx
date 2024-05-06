import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { Props } from 'src/shared/components/inputs/checkbox/';
import { Checkbox } from 'src/shared/components';

export const CheckboxField = memo(({ name, label, ...rest }: Props) => {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController<{ fieldName: boolean }, 'fieldName'>({ name: name as 'fieldName' });

  return (
    <Checkbox
      checked={field.value}
      errorText={error && isTouched ? error.message : ''}
      inputRef={field.ref}
      label={label}
      name={field.name}
      onChange={field.onChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
});
