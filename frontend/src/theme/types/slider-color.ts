export type StatusColors = {
  full: string;
  fullBackground: string;
  fullShadow: string;
  middle: string;
  middleBackground: string;
  middleShadow: string;
  normal: string;
  normalBackground: string;
  normalShadow: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    sliderColor: StatusColors;
  }
  interface PaletteOptions {
    sliderColor: StatusColors;
  }
}
