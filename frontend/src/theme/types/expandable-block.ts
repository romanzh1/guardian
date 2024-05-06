export type ExpandableBlockColors = {
  background: string;
  button: string;
  icon: string;
  hover: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    expandableBlock: ExpandableBlockColors;
  }
  interface PaletteOptions {
    expandableBlock: ExpandableBlockColors;
  }
}
