import classNames from 'classnames';
import React, { memo } from 'react';
import { CircularProgress, ButtonProps } from '@mui/material';
import { Button } from '../button';
import styles from './index.module.scss';

type PropsType = {
  isLoading?: boolean;
};

export const ButtonWithLoader = memo(
  ({
    type = 'submit',
    color = 'primary',
    variant = 'contained',
    disabled,
    isLoading = false,
    fullWidth,
    ...rest
  }: ButtonProps & PropsType) => {
    return (
      <div className={classNames(styles.root, { [styles.root_fullWidth]: fullWidth })}>
        <Button
          color={color}
          disabled={isLoading || disabled}
          fullWidth={fullWidth}
          type={type}
          variant={variant}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
        {isLoading && <CircularProgress className={styles.preloader} size={24} />}
      </div>
    );
  },
);
