import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
  }

  interface SimplePaletteColorOptions {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
  }
}
