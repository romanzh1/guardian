import React, { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper } from '@mui/material';
import styles from './index.module.scss';
import { SimpleInput } from '../simple-input';
import { DateField } from '../dates/date-field';

type ComponentProps = {
  value: string;
  onChange: (value: any) => void;
  options?: any;
  isLoading?: boolean;
};

type Props = {
  setValue: (newValue: string) => void;
  Component: React.ComponentType<ComponentProps> | null;
  Input: typeof DateField | typeof SimpleInput;
  onClickAway: (e: MouseEvent | TouchEvent) => void;
  defaultValue: string | undefined;
  onBackspacePress: () => void;
  options?: any;
  isLoading?: boolean;
};

export const InputPopper = memo(
  ({ setValue, onBackspacePress, Component, Input, onClickAway, defaultValue, options = [], isLoading }: Props) => {
    const [inputValue, setInputValue] = useState<string>(defaultValue ?? '');

    const anchorRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => setIsVisible(true), []);

    const onChangeInput = useCallback((value: string) => {
      setInputValue(value);
    }, []);

    const onChangePopper = useCallback(
      (value: any) => {
        setInputValue(value);
        setValue(value);
      },
      [setValue],
    );
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && inputValue.trim().length !== 0) {
          event.preventDefault();
          setValue(inputValue);
        } else if (
          event.key === 'Backspace' &&
          onBackspacePress &&
          (event.currentTarget.value.trim() === '' || /__.__.____ - __.__.____/.test(event.currentTarget.value))
        ) {
          event.preventDefault();
          onBackspacePress();
        }
      },
      [setValue, inputValue, onBackspacePress],
    );

    return (
      <div className={styles.root}>
        <ClickAwayListener onClickAway={onClickAway}>
          <div ref={anchorRef} className={styles.input}>
            <Input handleKeyDown={handleKeyDown} onChange={onChangeInput} value={inputValue} />
          </div>
        </ClickAwayListener>
        {Component && (
          <ClickAwayListener onClickAway={onClickAway}>
            <div>
              <Popper
                anchorEl={anchorRef.current}
                open={isVisible}
                placement="bottom-start"
                sx={{ position: 'absolute', zIndex: 12 }}
              >
                <Paper>
                  <Component isLoading={isLoading} onChange={onChangePopper} options={options} value={inputValue} />
                </Paper>
              </Popper>
            </div>
          </ClickAwayListener>
        )}
      </div>
    );
  },
);
