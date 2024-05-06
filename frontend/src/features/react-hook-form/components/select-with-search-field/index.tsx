import { PropsWithChildren, memo } from 'react';
import { useController } from 'react-hook-form';
import { SelectWithSearch } from 'src/shared/components/inputs/select-with-search';
import type { SelectWithSearchProps } from 'src/shared/components/inputs/select-with-search';

type Props = Omit<SelectWithSearchProps, 'name' | 'value'> & { name: string; isLoading?: boolean };

export const SelectWithSearchField = memo(({ children, name, ...rest }: PropsWithChildren<Props>) => {
  const {
    field,
    fieldState: { error },
  } = useController<{ fieldName: string }, 'fieldName'>({ name: name as 'fieldName' });

  return (
    <SelectWithSearch
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
    </SelectWithSearch>
  );
});
