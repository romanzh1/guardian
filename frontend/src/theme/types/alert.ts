export type AlertColors = {
  background: string;
  icon: string;
  text: string;
};

export type AlertsColors = {
  success: AlertColors;
  error: AlertColors;
  warning: AlertColors;
  info: AlertColors;
  default: AlertColors;
};

declare module '@mui/material/styles' {
  interface Palette {
    alerts: AlertsColors;
  }
  interface PaletteOptions {
    alerts: AlertsColors;
  }
}
