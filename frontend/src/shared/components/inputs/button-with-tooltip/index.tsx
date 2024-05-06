import { memo, ReactNode } from 'react';
import { ButtonProps, IconButton, Tooltip } from '@mui/material';
import { Button } from '../button';

type Props = {
  isIconButton?: boolean;
  tooltip: string | ReactNode;
};
export const ButtonWithTooltip = memo(
  ({ isIconButton, tooltip, variant = 'text', fullWidth, ...rest }: ButtonProps & Props) => {
    if (isIconButton) {
      return (
        <Tooltip arrow title={tooltip}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <div>
            <IconButton
              color="secondary"
              size="small"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
            />
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip arrow title={tooltip}>
        <div>
          <Button
            fullWidth={fullWidth}
            variant={variant}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        </div>
      </Tooltip>
    );
  },
);
