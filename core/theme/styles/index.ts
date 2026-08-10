import { createTheme } from '@mui/material/styles';

import { components } from './components';
import { palette } from './palette';
import { shape } from './shape';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = createTheme({
  palette,
  spacing,
  shape,
  typography,
  components,
});
