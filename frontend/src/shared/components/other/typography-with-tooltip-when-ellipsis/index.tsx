import React, { memo, useEffect, useRef, useState } from 'react';
import { Tooltip, Typography, TypographyProps } from '@mui/material';

/* eslint-disable react/jsx-props-no-spreading */
export const TypographyWithTooltipWhenEllipsis = memo(({ children, ...rest }: TypographyProps) => {
  const [hasTooltip, setHasTooltip] = useState<boolean>(false);
  const textRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (textRef.current && textRef.current.offsetWidth < textRef.current.scrollWidth) {
      setHasTooltip(true);
    }
  }, []);

  return hasTooltip ? (
    <Tooltip
      arrow
      title={
        <Typography color="inherit" variant="text">
          {children}
        </Typography>
      }
    >
      <Typography ref={textRef} {...rest}>
        {children}
      </Typography>
    </Tooltip>
  ) : (
    <Typography ref={textRef} {...rest}>
      {children}
    </Typography>
  );
});
