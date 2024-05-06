export type TableColors = {
  headerBackground: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    table: TableColors;
  }
  interface PaletteOptions {
    table: TableColors;
  }
}
