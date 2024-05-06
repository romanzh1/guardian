export type IssueListColors = {
  background: string;
  textTitle: string;
  border: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    issueList: IssueListColors;
  }
  interface PaletteOptions {
    issueList: IssueListColors;
  }
}
