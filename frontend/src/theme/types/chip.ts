export type ChipColors = {
  background: string;
  deleteIcon: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    chip: ChipColors;
  }
  interface PaletteOptions {
    chip: ChipColors;
  }
}
