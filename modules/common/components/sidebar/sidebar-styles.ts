import { styled } from '@mui/material/styles';
import {
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 72;

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  '& .MuiDrawer-paper': {
    width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,

    padding: open ? '24px 16px' : '24px 12px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export const LogoContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : 'center',
  minHeight: 40,
  marginBottom: 32,
}));

export const BrandBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  overflow: 'hidden',
});

export const LogoIconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,

  '& svg': {
    fontSize: 22,
  },
}));

export const BrandTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  letterSpacing: '-0.02em',
}));

export const UserContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'initial' : 'center',
  gap: 12,
  minHeight: 48,
  marginBottom: 24,
  padding: open ? '0 16px' : '0 8px',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));

export const UserIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: theme.palette.primary.main,

  '& svg': {
    fontSize: 32,
  },
}));

export const UserEmail = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

export const StyledList = styled(List)({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const StyledListItem = styled(ListItem)({
  display: 'block',
});

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isOpen',
})<{
  isActive: boolean;
  isOpen: boolean;
}>(({ theme, isActive, isOpen }) => ({
  minHeight: 48,
  justifyContent: isOpen ? 'initial' : 'center',
  padding: isOpen ? '0 16px' : '0 8px',
  borderRadius: 12,

  backgroundColor: isActive ? theme.palette.primary[100] : 'transparent',

  color: isActive ? theme.palette.text.primary : theme.palette.text.secondary,

  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest,
  }),

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary[100]
      : theme.palette.grey[100],

    color: theme.palette.text.primary,
  },

  '&:active': {
    backgroundColor: theme.palette.primary[200],
  },
}));

export const StyledListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isOpen',
})<{
  isActive: boolean;
  isOpen: boolean;
}>(({ theme, isActive, isOpen }) => ({
  minWidth: 0,
  marginLeft: isOpen ? 24 : 2.4,
  marginRight: isOpen ? 12 : 0,

  justifyContent: 'center',

  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,

  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StyledListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isOpen',
})<{
  isActive: boolean;
  isOpen: boolean;
}>(({ isOpen, isActive }) => ({
  opacity: isOpen ? 1 : 0,

  transition: 'opacity 0.15s ease',

  '& .MuiTypography-root': {
    fontWeight: isActive ? 600 : 400,
  },
}));
