import React, { memo } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';
import styles from './index.module.scss';
import { Userpic } from '../userpic';

type Props = {
  firstName: string;
  lastName: string;
  middleName?: string | null;
  size?: 'small' | 'medium';
  sx?: SxProps<Theme>;
  isNotPic?: boolean;
  isFullName?: boolean;
};

enum FontSize {
  small = 13,
  medium = 14,
}

export const User = memo(
  ({ firstName, lastName, size = 'medium', sx, isNotPic, isFullName = false, middleName = '' }: Props) => {
    const fullName =
      middleName && middleName.length > 0 ? `${lastName} ${firstName} ${middleName}` : `${lastName} ${firstName}`;
    return (
      <div className={styles.root}>
        {!isNotPic && <Userpic firstName={firstName} lastName={lastName} size={size} />}
        {isFullName ? (
          <Typography sx={{ fontSize: FontSize[size], ...sx }} variant="text">
            {fullName}
          </Typography>
        ) : (
          <Typography sx={{ fontSize: FontSize[size], ...sx }} variant="text">{`${lastName} ${firstName}`}</Typography>
        )}
      </div>
    );
  },
);
