enum IssueTransition {
  info = 'info',
  error = 'error',
  success = 'success',
  warning = 'warning',
}
export type IssueTransitionType = keyof typeof IssueTransition;
export type IssueTransitionColors = Record<
  IssueTransition,
  {
    label: string;
    background: string;
  }
>;

declare module '@mui/material/styles' {
  interface Palette {
    issueTransition: IssueTransitionColors;
  }
  interface PaletteOptions {
    issueTransition: IssueTransitionColors;
  }
}
