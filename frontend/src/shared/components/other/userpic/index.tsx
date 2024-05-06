import React, { memo } from 'react';
import { Avatar, Typography, TypographyProps } from '@mui/material';
import { stringToHsl } from 'src/shared/utils';

type Props = {
  firstName?: string;
  lastName?: string;
  src?: string;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  textSx?: TypographyProps['sx'];
};

enum IconSize {
  tiny = 16,
  small = 20,
  medium = 32,
  large = 106,
}

enum BorderRadius {
  tiny = '2px',
  small = '4px',
  medium = '8px',
  large = '8px',
}

enum FontSize {
  tiny = 8,
  small = 10,
  medium = 16,
  large = 28,
}

export const Userpic = memo(({ firstName = '', lastName = '', src = '', textSx, size = 'medium' }: Props) => {
  const nameLetters = firstName && lastName ? lastName[0].toUpperCase() + firstName[0].toUpperCase() : '';
  const fullName = `${lastName} ${firstName}`;

  return (
    <Avatar
      alt={fullName}
      src={src}
      sx={{
        width: IconSize[size],
        height: IconSize[size],
        bgcolor: stringToHsl(nameLetters, 37, 73),
        borderRadius: BorderRadius[size],
      }}
    >
      {nameLetters && (
        <Typography
          color="inherit"
          sx={{
            fontSize: FontSize[size],
            ...textSx,
          }}
        >
          {nameLetters}
        </Typography>
      )}
    </Avatar>
  );
});
