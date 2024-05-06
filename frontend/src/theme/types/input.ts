export type InputColors = {
  main: string;
  hover: string;
  active: string;
  error: string;
  label: string;
  disabledText: string;
  disabledBg: string;
  background: string;
  placeholder: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    input: InputColors;
  }
  interface PaletteOptions {
    input: InputColors;
  }
}
