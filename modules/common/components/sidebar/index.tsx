'use client';

import { useState } from 'react';
import { Box, Tooltip } from '@mui/material';

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
  SidebarWrapper,
  DividerStyled,
  UserInfoWrapper,
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
  const userEmail = currentUser?.email ?? 'Guest';

  return (
    <StyledDrawer
      variant='permanent'
      open={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked((prev) => !prev)}
    >
      <SidebarWrapper>
        <Box>
          <LogoContainer open={open}>
            <BrandBox>
              <LogoIconWrapper>
                <LocalHospitalIcon />
              </LogoIconWrapper>

              {open && <BrandTitle variant='h6'>Health</BrandTitle>}
            </BrandBox>
          </LogoContainer>

          <DividerStyled />

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

        <Box sx={{ mt: 'auto' }}>
          <DividerStyled />
          <UserContainer
            open={open}
            onClick={(event) => event.stopPropagation()}
          >
            <UserIcon>
              <AccountCircleIcon />
            </UserIcon>

            {open && (
              <UserInfoWrapper>
                <Tooltip title={userEmail} placement='right' arrow>
                  <UserEmail>{userEmail}</UserEmail>
                </Tooltip>
              </UserInfoWrapper>
            )}
          </UserContainer>
        </Box>
      </SidebarWrapper>
    </StyledDrawer>
  );
};
