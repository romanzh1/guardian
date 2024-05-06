import React, { memo } from 'react';
import classnames from 'classnames';
import { SvgIcon, SvgIconProps } from '@mui/material';
import styles from './index.module.scss';

export const CircularProgressSvg = memo(({ className, ...rest }: SvgIconProps) => {
  return (
    <SvgIcon
      className={classnames(styles.root, className)}
      viewBox="22 22 44 44"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <circle className={styles.circle} cx="44" cy="44" fill="none" r="20.2" strokeWidth="3.6" />
    </SvgIcon>
  );
});
