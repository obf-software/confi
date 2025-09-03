import { Box, Container, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import { FiMenu, FiX } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { ColorModeButton } from '../../../components/color-mode';
import { useLocation } from 'react-router-dom';
import { SidebarContent } from './sidebar';
import { useAuth } from '../../../hooks/use-auth';
import { useCurrentUser } from '../../../hooks/use-current-user';

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { user, signOut } = useAuth();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Flex
      h='100vh'
      // bg='white'
    >
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <Box
          position='fixed'
          inset='0'
          bg='blackAlpha.600'
          zIndex='overlay'
          display={{ base: 'block', lg: 'none' }}
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <Box
        position={{ base: 'fixed', lg: 'static' }}
        left={{ base: isSidebarOpen ? '0' : '-280px', lg: '0' }}
        top='0'
        h='full'
        zIndex='modal'
        transition='left 0.3s'
        display={{ base: 'block', lg: 'block' }}
      >
        <SidebarContent
          user={currentUser.data}
          isOpen={isSidebarOpen}
          onLogout={handleLogout}
          onCloseSidebar={handleCloseSidebar}
        />
      </Box>

      {/* Main content */}
      <Flex
        direction='column'
        flex='1'
        overflow='hidden'
      >
        {/* Top bar for mobile */}
        <HStack
          display={{ base: 'flex', lg: 'none' }}
          justify='space-between'
          p='4'
          bg='bg.canvas'
          borderBottomWidth='1px'
          borderColor='border.default'
        >
          <IconButton
            variant='ghost'
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
            aria-label='Toggle sidebar'
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </IconButton>
          <Text
            fontSize='xl'
            fontWeight='bold'
            color='teal.500'
          >
            Confi
          </Text>
          <ColorModeButton />
        </HStack>

        <Box
          flex='1'
          overflow='auto'
        >
          <Container
            maxW='8xl'
            py='8'
          >
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
};
