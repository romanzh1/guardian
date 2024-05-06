export type TabsColors = {
  background: string;
  indicator: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    tabs: TabsColors;
  }
  interface PaletteOptions {
    tabs: TabsColors;
  }
}
