export type FilledInputColors = {
  background: string;
  hoverBg: string;
  focusedBg: string;
  focusedBorder: string;
  placeholder: string;
  disabled: string;
  text: string;
  error: string;
  main: string;
  active: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    filledInput: FilledInputColors;
  }
  interface PaletteOptions {
    filledInput: FilledInputColors;
  }
}
