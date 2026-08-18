'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useCurrentUser } from '../../../user/providers';

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
  UserContainer,
  UserIcon,
  UserEmail,
} from './sidebar-styles';

const MENU_ITEMS = [
  {
    text: 'Drugs',
    icon: <DashboardIcon />,
  },
];

export const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const open = hovered || clicked;

  return (
    <StyledDrawer
      variant='permanent'
      open={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked((prev) => !prev)}
    >
      <Box>
        <LogoContainer open={open}>
          <BrandBox>
            <LogoIconWrapper>
              <LocalHospitalIcon />
            </LogoIconWrapper>

            {open && <BrandTitle variant='h6'>Health</BrandTitle>}
          </BrandBox>
        </LogoContainer>

        <UserContainer open={open}>
          <UserIcon>
            <AccountCircleIcon />
          </UserIcon>

          {open && <UserEmail>{currentUser?.email ?? ''}</UserEmail>}
        </UserContainer>

        <StyledList onClick={(event) => event.stopPropagation()}>
          {MENU_ITEMS.map((item, index) => {
            const isActive = index === 0;

            return (
              <StyledListItem key={item.text} disablePadding>
                <StyledListItemButton isActive={isActive} isOpen={open}>
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
    </StyledDrawer>
  );
};
