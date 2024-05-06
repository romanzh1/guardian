export type ConfigStatusColor = {
  newColor: string;
  newTextColor: string;
  exploitation: string;
  exploitationTextColor: string;
  employee: string;
  employeeTextColor: string;
  movement: string;
  movementTextColor: string;
  repair: string;
  repairTextColor: string;
  warehouse: string;
  warehouseTextColor: string;
  disposed: string;
  disposedTextColor: string;
  error: string;
  errorTextColor: string;
  unknown: string;
  unknownTextColor: string;
  broken: string;
  brokenTextColor: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    configStatusColor: ConfigStatusColor;
  }
  interface PaletteOptions {
    configStatusColor: ConfigStatusColor;
  }
}
