import * as React from 'react';
import { HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { Autocomplete, AutocompleteRenderGetTagProps, Chip, Paper, Typography, useTheme } from '@mui/material';
import { useController } from 'react-hook-form';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Status } from 'src/shared/types/status';
import { Input } from 'src/shared/components/inputs';

/* eslint-disable react/jsx-props-no-spreading */
const getOptionLabel = ({ name }: Status) => `${name}`;
const renderTags = (values: Array<Status>, getTagProps: AutocompleteRenderGetTagProps) =>
  values.map((v, index) => (
    <Chip
      deleteIcon={<CloseIcon fontSize="small" />}
      label={getOptionLabel(v)}
      size="small"
      sx={{ borderRadius: '4px' }}
      {...getTagProps({ index })}
    />
  ));

const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Status) => {
  return (
    <li
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      key={option.id}
    >
      <Typography variant="text">{option.name}</Typography>
    </li>
  );
};

const customPaper = (props: HTMLAttributes<HTMLElement>) => {
  return <Paper elevation={8} sx={{ borderRadius: '4px' }} {...props} />;
};

type Props = {
  actionBox: Array<Status>;
  fieldName: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

export const ControllerSelectAutocomplete = memo(({ fieldName, actionBox, label, placeholder, disabled }: Props) => {
  const theme = useTheme();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController<any, any>({ name: fieldName });

  const handleOnChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: Status | null) => {
      onChange(newValue ? newValue.id : '', { shouldValidate: true, shouldTouch: true });
    },
    [onChange],
  );
  const extendedValue = useMemo(() => actionBox.find(item => value === item.id) || null, [actionBox, value]);
  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      ListboxProps={{
        sx: {
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '2px',
          '& .MuiAutocomplete-option': {
            borderRadius: `${theme.properties.borderRadius}px`,
            minHeight: '30px',
            padding: '0px 8px',
          },
        },
      }}
      loadingText="Загрузка..."
      noOptionsText="Ничего не найдено"
      onChange={handleOnChange}
      options={actionBox}
      PaperComponent={customPaper}
      popupIcon={<KeyboardArrowDownOutlinedIcon color="secondary" />}
      renderInput={props => (
        <Input
          error={Boolean(error)}
          errorText={error ? error.message : ''}
          label={label}
          placeholder={placeholder}
          {...props}
          size="small"
        />
      )}
      renderOption={renderOption}
      renderTags={renderTags}
      size="small"
      value={extendedValue}
    />
  );
});
