export type CreateIssueHeaderColors = {
  text: string;
  background: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    createIssueHeader: CreateIssueHeaderColors;
  }
  interface PaletteOptions {
    createIssueHeader: CreateIssueHeaderColors;
  }
}
