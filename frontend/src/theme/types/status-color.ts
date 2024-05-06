export type StatusColors = {
  newStatus: string;
  development: string;
  preProd: string;
  production: string;
  closing: string;
  archived: string;
  unknown: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    statusColor: StatusColors;
  }
  interface PaletteOptions {
    statusColor: StatusColors;
  }
}
