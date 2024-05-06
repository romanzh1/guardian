export type AdminSidebarColors = {
  border: string;
  background: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    adminSidebar: AdminSidebarColors;
  }
  interface PaletteOptions {
    adminSidebar: AdminSidebarColors;
  }
}
