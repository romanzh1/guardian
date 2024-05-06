export type ParentsSelectColors = {
  background: string;
  hoverBg: string;
  focusedBg: string;
  focusedBorder: string;
  focusedLabel: string;
  label: string;
  placeholder: string;
  helpText: string;
  border: string;
  disabled: string;
  text: string;
  arrow: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    parentsSelectColors: ParentsSelectColors;
  }
  interface PaletteOptions {
    parentsSelectColors: ParentsSelectColors;
  }
}
