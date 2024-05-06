export type AuthorizationColors = {
  background: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    authorization: AuthorizationColors;
  }
  interface PaletteOptions {
    authorization: AuthorizationColors;
  }
}
