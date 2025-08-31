import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiLogOut, BiSearch, BiUser, BiCalendar } from 'react-icons/bi';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdOutlineBusinessCenter, MdOutlineAnalytics, MdOutlineLocalOffer, MdOutlineAutoAwesome } from 'react-icons/md';
import { AiOutlineTag, AiOutlineFileSearch } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { ColorModeButton } from './color-mode';
import { useAuth } from '../contexts/auth-context';
import { useCurrentUser } from '../hooks/use-current-user';

const SidebarLink: React.FC<{
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

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { logout } = useAuth();
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      void navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeSidebar = () => { setIsSidebarOpen(false); };

  const SidebarContent = () => (
    <VStack
      h='full'
      justify='space-between'
      align='stretch'
      p='6'
      bg='bg.canvas'
      borderRightWidth='1px'
      borderColor='border.default'
      minW='280px'
    >
      <VStack
        align='stretch'
        gap='4'
      >
        <HStack justify='space-between' align='center'>
          <Text
            fontSize='2xl'
            fontWeight='bold'
            color='brandPrimaryButton.fg'
          >
            Confi
          </Text>
          <ColorModeButton />
        </HStack>

        <Stack gap='2'>
          {/* Admin-only menu items */}
          {user?.role === 'ADMIN' && (
            <>
              <SidebarLink
                to='/dashboard/statistics'
                icon={<MdOutlineAnalytics />}
                onClick={closeSidebar}
              >
                Estatísticas
              </SidebarLink>
              <SidebarLink
                to='/dashboard/tags'
                icon={<AiOutlineTag />}
                onClick={closeSidebar}
              >
                Tags
              </SidebarLink>
              <SidebarLink
                to='/dashboard/admin/evaluations'
                icon={<MdOutlineAutoAwesome />}
                onClick={closeSidebar}
              >
                Avaliações
              </SidebarLink>
              <SidebarLink
                to='/dashboard/admin/opportunities'
                icon={<MdOutlineLocalOffer />}
                onClick={closeSidebar}
              >
                Oportunidades
              </SidebarLink>
              <SidebarLink
                to='/dashboard/admin/opportunities-search'
                icon={<AiOutlineFileSearch />}
                onClick={closeSidebar}
              >
                Busca de Oportunidades
              </SidebarLink>
              <SidebarLink
                to='/dashboard/admin/plannings'
                icon={<HiOutlineDocumentReport />}
                onClick={closeSidebar}
              >
                Planejamentos
              </SidebarLink>
              
              <Separator />
            </>
          )}
          
          {/* Common menu items for all users */}
          <SidebarLink
            to='/dashboard/find-opportunities'
            icon={<BiSearch />}
            onClick={closeSidebar}
          >
            Buscar Oportunidades
          </SidebarLink>
          <SidebarLink
            to='/dashboard/my-plannings'
            icon={<BiCalendar />}
            onClick={closeSidebar}
          >
            Meus Planejamentos
          </SidebarLink>
          <SidebarLink
            to='/dashboard/profile'
            icon={<BiUser />}
            onClick={closeSidebar}
          >
            Perfil
          </SidebarLink>
        </Stack>
      </VStack>

      <VStack
        align='stretch'
        gap='4'
      >
        <Separator />
        <Box>
          <Text
            fontSize='sm'
            color='fg.muted'
            mb='2'
          >
            Logado como:
          </Text>
          <Text
            fontSize='sm'
            fontWeight='medium'
            color='fg.default'
            textOverflow='ellipsis'
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {user?.email || 'Usuário'}
          </Text>
        </Box>
        <Button
          variant='ghost'
          colorPalette='red'
          justifyContent='flex-start'
          size='lg'
          onClick={() => {
            void handleLogout();
          }}
        >
          <Icon mr='3'>
            <BiLogOut />
          </Icon>
          Sair
        </Button>
      </VStack>
    </VStack>
  );

  return (
    <Flex
      h='100vh'
      bg='bg.surface'
    >
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <Box
          position='fixed'
          inset='0'
          bg='blackAlpha.600'
          zIndex='overlay'
          display={{ base: 'block', lg: 'none' }}
          onClick={closeSidebar}
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
        <SidebarContent />
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
            onClick={() => { setIsSidebarOpen(!isSidebarOpen); }}
            aria-label='Toggle sidebar'
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </IconButton>
          <Text
            fontSize='xl'
            fontWeight='bold'
            color='brandPrimaryButton.fg'
          >
            Confi
          </Text>
          <ColorModeButton />
        </HStack>

        {/* Page content */}
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