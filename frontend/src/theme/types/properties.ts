export type Properties = {
  borderRadius: number;
};

declare module '@mui/system' {
  interface ThemeOptions {
    properties: Properties;
  }
}

declare module '@mui/system' {
  interface Theme {
    properties: Properties;
  }
}
