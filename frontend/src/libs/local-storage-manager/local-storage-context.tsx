import React from 'react';
import { localStorageManager } from './instance';

export const LocalStorageContext = React.createContext({ data: localStorageManager.defaultData });
