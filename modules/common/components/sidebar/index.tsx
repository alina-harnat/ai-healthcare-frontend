'use client';

import { useState } from 'react';
import { Box, Tooltip } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import { Link, usePathname } from '@/core/localization/navigation';

import { useCurrentUser } from '../../../user/providers';
import { LocaleSwitcher } from '../locale-switcher';

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
    href: '/drugs',
  },
  {
    text: 'Security',
    icon: <SecurityIcon />,
    href: '/settings/security',
  },
];

export const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const pathname = usePathname();
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
            {MENU_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <StyledListItem key={item.text} disablePadding>
                  <Link
                    href={item.href}
                    style={{
                      color: 'inherit',
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
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
                  </Link>
                </StyledListItem>
              );
            })}
          </StyledList>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <DividerStyled />
          <Box
            onClick={(event) => event.stopPropagation()}
            sx={{
              display: 'flex',
              justifyContent: open ? 'flex-start' : 'center',
              py: 1,
            }}
          >
            <LocaleSwitcher compact={!open} />
          </Box>
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
