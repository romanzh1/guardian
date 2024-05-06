import React, { useCallback, useMemo, useState } from 'react';
import { ButtonBase, IconButton, ListItemText, useTheme } from '@mui/material';
import { MoreHorizOutlined } from '@mui/icons-material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { usePopoverProps } from 'src/shared/hooks';
import { Menu, MenuItem, Tab } from 'src/shared/components';
import { Tabs } from 'src/shared/components/navigation/tabs';
import styles from './index.module.scss';
import { ObservableTab } from './components';

type TabStructure = {
  label: string;
  value: string;
  disabled: boolean;
  icon?: React.ReactElement;
};

type GetValue<T extends ReadonlyArray<TabStructure>> = T[number]['value'];

export type TabsProps<T extends ReadonlyArray<TabStructure>> = {
  tabs: T;
  value: GetValue<T>;
  onChange: (value: GetValue<T>) => void;
  scrollable?: boolean;
  isSecondary?: boolean;
  isMenuTabs?: boolean;
};

export const TabsWrapper = <T extends ReadonlyArray<TabStructure>, TabKeys extends GetValue<T>>({
  tabs,
  value,
  onChange,
  scrollable = false,
  isSecondary = false,
  isMenuTabs = false,
}: TabsProps<T>) => {
  const theme = useTheme();

  const [tabsState, setTabsState] = useState(tabs.map(item => ({ value: item.value, isVisible: false })));
  const onChangeVisibility = useCallback((v: string, isVisible: boolean) => {
    setTabsState(oldValue => {
      const foundIndex = oldValue.findIndex(item => item.value === v);
      if (foundIndex > -1) {
        // eslint-disable-next-line no-param-reassign
        oldValue[foundIndex].isVisible = isVisible;
      }
      return [...oldValue];
    });
  }, []);

  const { isOpen, anchorElement, handleClose, handleOpen } = usePopoverProps();

  const hiddenTabs = useMemo(() => {
    const newTabs: Array<TabStructure> = [];
    tabsState.forEach(item => {
      const foundTab = tabs.find(tab => tab.value === item.value && !item.isVisible);
      if (foundTab) newTabs.push(foundTab);
    });

    return newTabs;
  }, [tabs, tabsState]);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: TabKeys) => {
      onChange(newValue);
    },
    [onChange],
  );
  const hasMenu = hiddenTabs.length > 0;

  if (scrollable)
    return (
      <div className={styles.root}>
        <Tabs onChange={handleChange} scrollButtons={false} value={value} variant="scrollable">
          {tabs.map(item => (
            <Tab key={item.value} disabled={item.disabled} icon={item.icon} label={item.label} value={item.value} />
          ))}
        </Tabs>
      </div>
    );

  if (isMenuTabs)
    return (
      <div className={styles.root}>
        <IconButton onClick={handleOpen} size="small">
          {isOpen ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
        </IconButton>
        <Menu anchorEl={anchorElement} onClose={handleClose} open={isOpen}>
          {tabs.map(item => (
            <MenuItem
              key={item.value}
              onClick={(event: any) => {
                handleClose();
                handleChange(event, item.value as TabKeys);
              }}
              value={item.value}
            >
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );

  return (
    <div className={styles.root}>
      <Tabs
        onChange={handleChange}
        scrollButtons={false}
        sx={{
          borderRadius: hasMenu
            ? `${theme.properties.borderRadius}px 0 0 ${theme.properties.borderRadius}px`
            : `${theme.properties.borderRadius}px`,
          backgroundColor: isSecondary ? 'none' : theme.palette.tabs.background,
        }}
        value={value}
        variant="scrollable"
      >
        {tabs.map(item => (
          <ObservableTab
            key={item.value}
            disabled={item.disabled}
            icon={item.icon}
            label={item.label}
            onChangeVisibility={onChangeVisibility}
            sx={{ borderBottom: isSecondary ? `1px solid ${theme.palette.tab.border}` : 'none' }}
            value={item.value}
          />
        ))}
      </Tabs>
      {hasMenu && (
        <ButtonBase
          onClick={handleOpen}
          sx={{
            backgroundColor: theme.palette.tabs.background,
            borderRadius: `0 ${theme.properties.borderRadius}px ${theme.properties.borderRadius}px 0`,
            padding: '0px 16px',
          }}
        >
          <MoreHorizOutlined className={styles.icon} />
        </ButtonBase>
      )}
      <Menu anchorEl={anchorElement} onClose={handleClose} open={isOpen}>
        {hiddenTabs.map(item => (
          <MenuItem
            key={item.value}
            onClick={(event: any) => {
              handleClose();
              handleChange(event, item.value as TabKeys);
            }}
            value={item.value}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
