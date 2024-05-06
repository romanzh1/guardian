import { ButtonProps, IconButton, ListItemIcon, ListItemText, PopoverOrigin } from '@mui/material';
import React, { memo, ReactNode } from 'react';
import { usePopoverProps } from 'src/shared/hooks';
import { Menu, MenuItem } from 'src/shared/components/navigation';
import { Button } from '../button';

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};

const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

export type MenuActions = {
  icon?: ReactNode;
  item: string;
  click: () => void;
};

type Props = {
  isIconButton?: boolean;
  actions: Array<MenuActions>;
};

export const ButtonWithMenu = memo(
  ({ isIconButton, size, actions, disabled, fullWidth, variant, ...rest }: ButtonProps & Props) => {
    const { anchorElement, isOpen, handleOpen, handleClose } = usePopoverProps();
    return (
      <>
        {isIconButton ? (
          <IconButton
            disabled={disabled}
            onClick={handleOpen}
            size={size}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        ) : (
          <Button
            disabled={disabled}
            fullWidth={fullWidth}
            onClick={handleOpen}
            variant={variant}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        )}
        <Menu
          anchorEl={anchorElement}
          anchorOrigin={anchorOrigin}
          keepMounted
          onClose={handleClose}
          open={isOpen}
          transformOrigin={transformOrigin}
        >
          {actions &&
            actions.map(el => (
              <MenuItem
                key={el.item}
                onClick={() => {
                  el.click();
                  handleClose();
                }}
              >
                {el.icon ? <ListItemIcon>{el.icon}</ListItemIcon> : null}
                <ListItemText primary={el.item} />
              </MenuItem>
            ))}
        </Menu>
      </>
    );
  },
);
