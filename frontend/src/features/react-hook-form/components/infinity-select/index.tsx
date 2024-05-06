import * as React from 'react';
import { ChangeEventHandler, HTMLAttributes, memo, useCallback, useMemo } from 'react';
import { Autocomplete, AutocompleteRenderGetTagProps, Chip, Paper, Typography, useTheme } from '@mui/material';
import { useController } from 'react-hook-form';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Status } from 'src/shared/types/status';
import { Input } from 'src/shared/components/inputs';
import { Observable } from 'src/shared/components';

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

const customPaper = (props: HTMLAttributes<HTMLElement>) => {
  return <Paper elevation={8} sx={{ borderRadius: '4px' }} {...props} />;
};

type Props = {
  actionBox: Array<Status>;
  fieldName: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  onNextPage: () => void;
  multiple?: boolean;
  onChangeInput?: (value: string) => void;
};

export const InfinitySelect = memo(
  ({ fieldName, actionBox, label, placeholder, disabled, onNextPage, multiple = false, onChangeInput }: Props) => {
    const handleOnChangeVisibility = useCallback(
      (value: boolean) => {
        if (value) onNextPage();
      },
      [onNextPage],
    );
    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Status, index?: number) => {
      const isObservable = actionBox.length - 1 === index;
      if (isObservable) {
        return (
          <Observable key={`${option.id}-${index}`} onChangeVisibility={handleOnChangeVisibility}>
            <li
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            >
              <Typography variant="text">{option.name}</Typography>
            </li>
          </Observable>
        );
      }
      return (
        <li
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          key={`${option.id}-${index}`}
        >
          <Typography variant="text">{option.name}</Typography>
        </li>
      );
    };

    const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
      e => {
        const searchValue = e.target.value;
        if (onChangeInput) onChangeInput(searchValue);
      },
      [onChangeInput],
    );

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

    if (multiple) {
      return (
        <Autocomplete
          disableCloseOnSelect
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
          multiple
          noOptionsText="Ничего не найдено"
          onChange={(event, val) => onChange(val)}
          options={actionBox}
          PaperComponent={customPaper}
          popupIcon={<KeyboardArrowDownOutlinedIcon color="secondary" />}
          renderInput={props => (
            <Input
              error={Boolean(error)}
              errorText={error ? error.message : ''}
              label={label}
              onChange={handleSearch}
              placeholder={placeholder}
              {...props}
              size="small"
            />
          )}
          renderOption={(props, option, state) => renderOption(props, option, state.index)}
          renderTags={renderTags}
          size="small"
          value={value}
        />
      );
    }
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
        onChange={(event, val) => handleOnChange(event, val)}
        options={actionBox}
        PaperComponent={customPaper}
        popupIcon={<KeyboardArrowDownOutlinedIcon color="secondary" />}
        renderInput={props => (
          <Input
            error={Boolean(error)}
            errorText={error ? error.message : ''}
            label={label}
            onChange={handleSearch}
            placeholder={placeholder}
            {...props}
            size="small"
          />
        )}
        renderOption={(props, option, state) => renderOption(props, option, state.index)}
        renderTags={renderTags}
        size="small"
        value={extendedValue}
      />
    );
  },
);
