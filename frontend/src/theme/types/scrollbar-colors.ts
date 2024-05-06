export type ScrollbarColors = {
  track: string;
  thumb: string;
  corner: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    scrollbar: ScrollbarColors;
  }
  interface PaletteOptions {
    scrollbar: ScrollbarColors;
  }
}
