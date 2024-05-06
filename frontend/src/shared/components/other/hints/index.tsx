import React, { memo } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Popover, PopoverOrigin, Typography, Box } from '@mui/material';
import { usePopoverProps } from 'src/shared/hooks';
import styles from './index.module.scss';

const style = { pointerEvents: 'none' };

type Props = {
  title?: string;
  text: string;
};

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

export const Hints = memo(({ title, text }: Props) => {
  const { handleOpen, anchorElement, isOpen, handleClose } = usePopoverProps();
  return (
    <div className={styles.root}>
      <Box className={styles.box} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
        <HelpOutlineIcon color="secondary" fontSize="small" />
      </Box>
      <Popover
        anchorEl={anchorElement}
        anchorOrigin={anchorOrigin}
        disableRestoreFocus
        onClose={handleClose}
        open={isOpen}
        sx={style}
        transformOrigin={transformOrigin}
      >
        <div className={styles.hint}>
          {title && <Typography variant="inherit">{title}</Typography>}
          <Typography variant="text">{text}</Typography>
        </div>
      </Popover>
    </div>
  );
});
