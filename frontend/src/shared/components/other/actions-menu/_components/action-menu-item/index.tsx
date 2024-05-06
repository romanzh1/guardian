import React, { forwardRef, MouseEvent, ReactNode, Ref, useCallback } from 'react';
import { ListItemIcon, ListItemText, TypographyProps } from '@mui/material';
import { MenuItem } from 'src/shared/components/navigation';

export declare type MenuItemAction<T> = (payload: T) => void;

export type ActionsMenuActionItem<T> = {
  title: string;
  titleColor?: TypographyProps['color'];
  onClick: MenuItemAction<T>;
  icon: ReactNode;
  disabled?: boolean;
  roledescription?: string;
};

type Props<T> = {
  payload: T;
  action: ActionsMenuActionItem<T>;
  onItemClick: (action: MenuItemAction<T>, payload: T, event: MouseEvent) => void;
};

export const ActionMenuItemC = <T extends string | object | number>(
  { action: { titleColor, roledescription, disabled, icon, title, onClick }, payload, onItemClick }: Props<T>,
  ref: Ref<HTMLLIElement>,
) => {
  const handleItemClick = useCallback(
    (event: MouseEvent) => {
      onItemClick(onClick, payload, event);
    },
    [onClick, onItemClick, payload],
  );

  return (
    <MenuItem ref={ref} aria-roledescription={roledescription} disabled={disabled} onClick={handleItemClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </MenuItem>
  );
};

export const ActionMenuItem = forwardRef(ActionMenuItemC) as typeof ActionMenuItemC;
