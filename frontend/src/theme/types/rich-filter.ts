export type RichFilterColos = {
  border: string;
  chip: {
    text: {
      hover: string;
    };
  };
  calendar: {
    selectButton: string;
    main: string;
  };
};

declare module '@mui/material/styles' {
  interface Palette {
    richFilter: RichFilterColos;
  }
  interface PaletteOptions {
    richFilter: RichFilterColos;
  }
}
