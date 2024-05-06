export type ListItemColors = {
  hoverBackground: string;
  border: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    listItem: ListItemColors;
  }
  interface PaletteOptions {
    listItem: ListItemColors;
  }
}
