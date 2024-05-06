import { HelpTwoTone } from '@mui/icons-material';
import { Tooltip as MuiTooltip } from '@mui/material';
import React, { PropsWithChildren, memo } from 'react';

export const HelpTooltip = memo(({ children }: PropsWithChildren<{}>) => {
  return (
    <MuiTooltip arrow title={children}>
      <HelpTwoTone color="secondary" fontSize="tiny" />
    </MuiTooltip>
  );
});
