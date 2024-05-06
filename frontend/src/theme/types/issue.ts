export type IssuePageColors = {
  headerText: string;
  headerBackground: string;
  sidebarBackground: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    issuePage: IssuePageColors;
  }
  interface PaletteOptions {
    issuePage: IssuePageColors;
  }
}
