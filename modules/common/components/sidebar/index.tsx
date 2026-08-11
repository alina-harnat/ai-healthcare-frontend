'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import {
  StyledDrawer,
  LogoContainer,
  BrandBox,
  LogoIconWrapper,
  StyledListItemButton,
  StyledList,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText,
  BrandTitle,
  ToggleButton,
  CollapsedToggleContainer,
  CollapsedToggleIcon,
} from './sidebar-styles';

const MENU_ITEMS = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
  },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <StyledDrawer variant='permanent' open={open}>
      <Box>
        <LogoContainer open={open}>
          <BrandBox>
            <LogoIconWrapper>
              <LocalHospitalIcon />
            </LogoIconWrapper>

            {open && <BrandTitle variant='h6'>Health</BrandTitle>}
          </BrandBox>

          {open && (
            <ToggleButton onClick={toggleDrawer}>
              <MenuOpenIcon />
            </ToggleButton>
          )}
        </LogoContainer>

        <StyledList>
          {MENU_ITEMS.map((item, index) => {
            const isActive = index === 0;

            return (
              <StyledListItem key={item.text} disablePadding>
                <StyledListItemButton
                  isActive={isActive}
                  isOpen={open}
                  onClick={!open ? toggleDrawer : undefined}
                >
                  <StyledListItemIcon isActive={isActive} isOpen={open}>
                    {item.icon}
                  </StyledListItemIcon>

                  <StyledListItemText
                    primary={item.text}
                    isOpen={open}
                    isActive={isActive}
                  />
                </StyledListItemButton>
              </StyledListItem>
            );
          })}
        </StyledList>
      </Box>

      {!open && (
        <CollapsedToggleContainer>
          <ToggleButton onClick={toggleDrawer}>
            <CollapsedToggleIcon />
          </ToggleButton>
        </CollapsedToggleContainer>
      )}
    </StyledDrawer>
  );
};
