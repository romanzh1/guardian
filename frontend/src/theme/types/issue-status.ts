export enum IssueStatus {
  info = 'info',
  error = 'error',
  success = 'success',
  warning = 'warning',
}
export type IssueStatusType = keyof typeof IssueStatus;
export type IssueStatusColors = Record<
  IssueStatus,
  {
    text: string;
    border: string;
  }
>;

declare module '@mui/material/styles' {
  interface Palette {
    issueStatus: IssueStatusColors;
  }
  interface PaletteOptions {
    issueStatus: IssueStatusColors;
  }
}
