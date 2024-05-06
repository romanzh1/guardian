import { PropsWithChildren, memo } from 'react';
import { useController } from 'react-hook-form';
import { Select } from 'src/shared/components/inputs/select';
import type { SelectProps } from 'src/shared/components/inputs/select';

type Props = Omit<SelectProps, 'name' | 'value'> & { name: string; isLoading?: boolean };

export const SelectField = memo(({ children, name, ...rest }: PropsWithChildren<Props>) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({ name: name as 'fieldName' });

  return (
    <Select
      errorText={error ? error.message : ''}
      inputRef={field.ref}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      value={field.value === undefined ? '' : field.value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Select>
  );
});
