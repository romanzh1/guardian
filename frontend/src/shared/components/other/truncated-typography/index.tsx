/* eslint-disable react/jsx-props-no-spreading */
import { Typography, TypographyProps } from '@mui/material';
import React, { memo } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = TypographyProps & { lineCount?: number };

export const TruncatedTypography = memo(({ lineCount = 1, children, className, style, ...rest }: Props) => {
  return (
    <Typography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      className={cn(styles.root, className)}
      component="span"
      style={{ WebkitLineClamp: lineCount, ...style }}
    >
      {children}
    </Typography>
  );
});
