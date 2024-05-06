import { memo } from 'react';
import { Typography } from '@mui/material';

type Props = {
  background: string;
  status: string;
  isTable: boolean;
};

export const StatusBox = memo(({ status, background, isTable }: Props) => {
  return (
    <Typography
      sx={{
        color: 'white',
        background,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        padding: '4px',
        borderRadius: '2px',
      }}
      variant={isTable ? 'tinytext' : 'text'}
    >
      {status}
    </Typography>
  );
});
