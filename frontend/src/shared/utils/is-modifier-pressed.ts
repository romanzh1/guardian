import { MouseEvent } from 'react';

export const isModifierPressed = (event: MouseEvent) => event.metaKey || event.shiftKey || event.ctrlKey;
