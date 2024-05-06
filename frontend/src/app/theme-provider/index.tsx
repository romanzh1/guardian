import React, { memo, PropsWithChildren } from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { defaultTheme } from 'src/theme';

export const ThemeProvider = memo(({ children }: PropsWithChildren<{}>) => {
  return <CssVarsProvider theme={defaultTheme}>{children}</CssVarsProvider>;
});
