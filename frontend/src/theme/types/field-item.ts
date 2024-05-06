export type FieldItemColors = {
  background: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    fieldItem: FieldItemColors;
  }
  interface PaletteOptions {
    fieldItem: FieldItemColors;
  }
}
