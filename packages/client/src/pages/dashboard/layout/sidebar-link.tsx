import { Button, Icon } from '@chakra-ui/react';
import React from 'react';

import { NavLink } from 'react-router-dom';

export const SidebarLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ to, icon, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    style={({ isActive }) => ({
      textDecoration: 'none',
      display: 'block',
      width: '100%',
    })}
  >
    {({ isActive }) => (
      <Button
        variant='ghost'
        justifyContent='flex-start'
        size='lg'
        w='full'
        bg={isActive ? 'brandPrimaryButton.subtle' : 'transparent'}
        color={isActive ? 'brandPrimaryButton.emphasized' : 'fg.default'}
        fontWeight={isActive ? 'semibold' : 'normal'}
      >
        <Icon mr='3'>{icon}</Icon>
        {children}
      </Button>
    )}
  </NavLink>
);
