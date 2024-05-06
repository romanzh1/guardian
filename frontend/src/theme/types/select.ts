export type SelectColors = {
  main: string;
  hover: string;
  active: string;
  error: string;
  label: string;
  disabledText: string;
  disabledBg: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    select: SelectColors;
  }
  interface PaletteOptions {
    select: SelectColors;
  }
}
