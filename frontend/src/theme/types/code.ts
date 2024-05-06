export type CodeColors = {
  border: string;
  background: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    code: CodeColors;
  }
  interface PaletteOptions {
    code: CodeColors;
  }
}
