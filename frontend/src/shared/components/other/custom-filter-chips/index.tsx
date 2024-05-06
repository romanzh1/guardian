import { Chip, ChipProps, useTheme } from '@mui/material';
import React, { memo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

type Props = ChipProps;
export const CustomFilterChips = memo(({ ...rest }: Props) => {
  const theme = useTheme();
  const { background, text } = theme.palette.createIssueHeader;
  return (
    <Chip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      deleteIcon={<ClearIcon fontSize="small" />}
      sx={{
        borderRadius: `4px`,
        border: 'none',
        maxWidth: ' 300px',
        backgroundColor: background,
        textTransform: 'none',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        color: text,
      }}
    />
  );
});
