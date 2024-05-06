import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle: React.CSSProperties;
    text: React.CSSProperties;
    subtext: React.CSSProperties;
    tinytext?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    subtitle?: React.CSSProperties;
    text?: React.CSSProperties;
    subtext?: React.CSSProperties;
    tinytext?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle: true;
    text: true;
    subtext: true;
    tinytext: true;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}
