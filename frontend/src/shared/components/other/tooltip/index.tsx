import { HelpTwoTone } from '@mui/icons-material';
import { Tooltip as MuiTooltip, SvgIconTypeMap } from '@mui/material';
import React, { memo } from 'react';

type Props = {
  title: string;
  color: SvgIconTypeMap['props']['color'];
  fontSize: SvgIconTypeMap['props']['fontSize'];
};

export const Tooltip = memo(({ title, color, fontSize }: Props) => {
  return (
    <MuiTooltip title={title}>
      <HelpTwoTone color={color} fontSize={fontSize} />
    </MuiTooltip>
  );
});
