export type ColorRadioColors = {
  border: string;
  checkedBorder: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    colorRadio: ColorRadioColors;
  }
  interface PaletteOptions {
    colorRadio: ColorRadioColors;
  }
}
