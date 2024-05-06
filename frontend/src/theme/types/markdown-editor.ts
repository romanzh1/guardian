export type MarkdownEditorColors = {
  main: string;
  hover: string;
  active: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    markdownEditor: MarkdownEditorColors;
  }
  interface PaletteOptions {
    markdownEditor: MarkdownEditorColors;
  }
}
