import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';

export const SkeletonSection = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,

  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
}));

export const SkeletonSectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const SkeletonSectionIcon = styled(Skeleton)({
  width: 20,
  height: 20,
  transform: 'none',
});

export const SkeletonSectionTitle = styled(Skeleton)({
  width: 140,
  height: 22,
  transform: 'none',
});

export const SkeletonFieldGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const SkeletonLabel = styled(Skeleton)({
  width: 80,
  height: 20,
  transform: 'none',
});

export const SkeletonInput = styled(Skeleton)({
  width: '100%',
  height: 40,
  borderRadius: 8,
  transform: 'none',
});

export const SkeletonTextarea = styled(Skeleton)({
  width: '100%',
  height: 90,
  borderRadius: 8,
  transform: 'none',
});

export const SkeletonChipRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const SkeletonChip = styled(Skeleton)({
  width: 100,
  height: 28,
  borderRadius: 14,
  transform: 'none',
});
