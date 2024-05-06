import { ButtonProps, Button as MuiButton, CircularProgress, CircularProgressProps, useTheme } from '@mui/material';
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { merge } from 'lodash';
import styles from './index.module.scss';

type Props = ButtonProps & {
  isLoading?: boolean;
  loaderProps?: CircularProgressProps;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'text', isLoading = false, disabled, fullWidth, loaderProps, sx, ...rest }: Props, ref) => {
    const theme = useTheme();
    const { borderRadius } = theme.properties;
    const defaultSx: Props['sx'] = { borderRadius: `${borderRadius}px`, textTransform: 'none' };
    const newSx = merge(defaultSx, sx);

    return (
      <div className={classNames(styles.root, { [styles.root_fullWidth]: fullWidth })}>
        <MuiButton
          ref={ref}
          disabled={isLoading || disabled}
          disableElevation
          fullWidth={fullWidth}
          variant={variant}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          sx={newSx}
        />
        {isLoading && (
          <CircularProgress
            className={styles.preloader}
            size={24}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...loaderProps}
          />
        )}
      </div>
    );
  },
);
