export type MenuItemColors = {
  titleBackground: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    modal: MenuItemColors;
  }
  interface PaletteOptions {
    modal: MenuItemColors;
  }
}
