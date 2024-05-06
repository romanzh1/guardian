export type ProfileColors = {
  status: {
    background: string;
  };
  delimiter: {
    color: string;
  };
};

declare module '@mui/material/styles' {
  interface Palette {
    profile: ProfileColors;
  }
  interface PaletteOptions {
    profile: ProfileColors;
  }
}
