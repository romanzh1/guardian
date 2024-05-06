export type CustomFieldCardColors = {
  border: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    customFieldCard: CustomFieldCardColors;
  }
  interface PaletteOptions {
    customFieldCard: CustomFieldCardColors;
  }
}
