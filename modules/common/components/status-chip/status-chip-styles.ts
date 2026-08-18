import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

import { StatusChipVariant } from '@/modules/common/enums';

const DEFAULT_WIDTH = 360;

export const StyledStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'variantColor',
})<{ variantColor: StatusChipVariant }>(({ theme, variantColor }) => {
  const paletteColor = theme.palette[variantColor];

  return {
    width: DEFAULT_WIDTH,
    maxWidth: '100%',
    justifyContent: 'flex-start',

    backgroundColor: paletteColor[100],
    borderColor: paletteColor[300],
    color: paletteColor[500],
    fontWeight: 500,

    '& .MuiChip-icon': {
      color: paletteColor[500],
      flexShrink: 0,
    },

    '& .MuiChip-label': {
      width: '100%',
      textAlign: 'left',
    },
  };
});

export const StatusChipLabel = styled('span')<{
  labelMaxWidth?: number | string;
}>(({ labelMaxWidth }) => ({
  display: 'block',
  width: '100%',
  maxWidth: labelMaxWidth ?? DEFAULT_WIDTH,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
