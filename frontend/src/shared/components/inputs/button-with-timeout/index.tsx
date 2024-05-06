import React, { memo, PropsWithChildren, useEffect, useState } from 'react';
import { ButtonProps } from '@mui/material';
import { ButtonWithLoader } from '../button-with-loader';

type Props = {
  onClick: () => void;
  timeAvailable: number;
  isLoading?: boolean;
  id?: string;
  variant?: ButtonProps['variant'];
};

const leadZero = (v: number) => (v < 10 ? `0${v}` : v);

export const ButtonWithTimeout = memo(
  ({ timeAvailable, onClick, isLoading, children, id, variant = 'contained' }: PropsWithChildren<Props>) => {
    const [secondsLeft, setSecondsLeft] = useState<number>(timeAvailable);

    useEffect(() => {
      setSecondsLeft(seconds => seconds - 1);
      const interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [timeAvailable]);

    return (
      <ButtonWithLoader
        color="inherit"
        disabled={secondsLeft > 0}
        disableElevation
        id={id}
        isLoading={isLoading}
        onClick={onClick}
        size="medium"
        type="button"
        variant={variant}
      >
        {secondsLeft > 0
          ? `${children} (${leadZero(Math.floor(secondsLeft / 60))}:${leadZero(secondsLeft % 60)})`
          : children}
      </ButtonWithLoader>
    );
  },
);
