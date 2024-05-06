import React, { memo, useCallback } from 'react';
import { IconButton, PopoverOrigin } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { usePopoverProps } from 'src/shared/hooks';
import { ActionMenuItem, ActionsMenuActionItem, MenuItemAction } from './_components/action-menu-item';
import { Menu } from '../../navigation';

const anchorOrigin: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

const transformOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'right' };

type Props<T> = {
  payload: T;
  actions: Array<ActionsMenuActionItem<T>>;
  buttonId?: string;
  disabled?: boolean;
};

const ActionsMenuComponent = <T extends string | object | number>({
  payload,
  actions,
  buttonId,
  disabled,
}: Props<T>) => {
  const { anchorElement, handleOpen, handleClose, isOpen } = usePopoverProps();

  const handleItemClick = useCallback(
    (action: MenuItemAction<T>, data: T) => {
      action(data);
      handleClose();
    },
    [handleClose],
  );

  return (
    <>
      <IconButton aria-roledescription={buttonId} disabled={disabled} onClick={handleOpen} size="small">
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        anchorOrigin={anchorOrigin}
        onClose={handleClose}
        open={isOpen}
        transformOrigin={transformOrigin}
      >
        {actions.map(action => (
          <ActionMenuItem key={action.title} action={action} onItemClick={handleItemClick} payload={payload} />
        ))}
      </Menu>
    </>
  );
};

export const ActionsMenu = memo(ActionsMenuComponent) as typeof ActionsMenuComponent;
