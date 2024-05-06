export type SchemaColors = {
  header: {
    background: string;
  };
};

declare module '@mui/material/styles' {
  interface Palette {
    schema: SchemaColors;
  }
  interface PaletteOptions {
    schema: SchemaColors;
  }
}
