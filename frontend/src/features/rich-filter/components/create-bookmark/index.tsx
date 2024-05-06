import { ChangeEvent, useCallback, useState } from 'react';
import { FormControlLabel, IconButton, Popover, RadioGroup, Tooltip, Typography, useTheme } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { Button, Input, Radio } from 'src/shared/components';
import { usePopoverProps } from 'src/shared/hooks';
import styles from './index.module.scss';
import { TypeSaveFilter } from '../../types';

type Props = {
  isLoading: boolean;
  isSystemWorkspace: boolean;
  saveWorkArea: (name: string) => void;
};

export const CreateBookmark = ({ isLoading, isSystemWorkspace, saveWorkArea }: Props) => {
  const theme = useTheme();
  const [radioValue, setRadioValue] = useState<string>(TypeSaveFilter.Same);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const handleRadioChange = useCallback((e: ChangeEvent<HTMLInputElement>, v: string) => setRadioValue(v), []);

  const { anchorElement: bookmark, handleOpen, handleClose, isOpen: isOpenSelectedFilters } = usePopoverProps();

  const handleSaveButtonClick = useCallback(() => {
    if (radioValue === TypeSaveFilter.New && newGroupName.length > 0) {
      saveWorkArea(newGroupName);
    } else {
      saveWorkArea(TypeSaveFilter.Same);
    }
    setNewGroupName('');
    handleClose();
  }, [radioValue, newGroupName, saveWorkArea, handleClose]);

  const handleNewGroupNameInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewGroupName(e.currentTarget.value),
    [],
  );

  return (
    <div className={styles.root}>
      <Tooltip
        arrow
        color="action"
        placement="bottom-start"
        sx={{ '& .MuiTooltip-tooltip': { maxWidth: '190px' } }}
        title="Сохранить настройки фильтра"
      >
        <IconButton onClick={handleOpen}>
          <TurnedInNot
            color="action"
            sx={{
              color: theme.palette.menuItem.icon,
              ':hover': { color: theme.palette.select.hover },
            }}
          />
        </IconButton>
      </Tooltip>
      {isOpenSelectedFilters && (
        <Popover
          anchorEl={bookmark}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          onClose={handleClose}
          open={isOpenSelectedFilters}
          sx={{ '& .MuiPaper-root': { width: '280px' } }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className={styles.title}>
            <Typography sx={{ fontWeight: '600' }} variant="text">
              Сохранить фильтр
            </Typography>
          </div>
          <div className={styles.container}>
            <RadioGroup onChange={handleRadioChange} sx={{ padding: '0 8px' }} value={radioValue}>
              {!isSystemWorkspace && (
                <FormControlLabel control={<Radio />} label="В текущий" value={TypeSaveFilter.Same} />
              )}
              <FormControlLabel control={<Radio />} label="В новый" value={TypeSaveFilter.New} />
            </RadioGroup>
            {radioValue === TypeSaveFilter.New && (
              <Input
                autoComplete="off"
                autoFocus
                className={styles.text}
                inputProps={{ maxLength: 30 }}
                onChange={handleNewGroupNameInput}
                placeholder="Напишите название"
                size="small"
                value={newGroupName}
              />
            )}
            <div className={styles.actions}>
              <Button fullWidth onClick={handleClose} variant="outlined">
                Отмена
              </Button>
              <Button fullWidth isLoading={isLoading} onClick={handleSaveButtonClick} variant="contained">
                Сохранить
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};
