export type MenuItemColors = {
  hover: string;
  icon: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    menuItem: MenuItemColors;
  }
  interface PaletteOptions {
    menuItem: MenuItemColors;
  }
}
