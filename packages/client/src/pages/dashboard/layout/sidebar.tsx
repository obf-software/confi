import { Box, Button, HStack, Icon, Separator, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiLogOut, BiSearch, BiUser, BiCalendar } from 'react-icons/bi';
import { MdOutlineAnalytics, MdOutlineLocalOffer, MdOutlineAutoAwesome } from 'react-icons/md';
import { AiOutlineTag, AiOutlineFileSearch } from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { ColorModeButton } from '../../../components/color-mode';
import { SidebarLink } from './sidebar-link';
import { User } from '../../../services/api';
import { routes } from '../../../lib/routes';

interface SidebarContentProps {
  user?: User;
  isOpen: boolean;
  onLogout: () => void;
  onCloseSidebar: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  user,
  isOpen,
  onLogout,
  onCloseSidebar,
}) => {
  return (
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
        <HStack
          justify='space-between'
          align='center'
        >
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
                to={routes.dashboard.admin.statistics}
                icon={<MdOutlineAnalytics />}
                onClick={onCloseSidebar}
              >
                Estatísticas
              </SidebarLink>
              <SidebarLink
                to={routes.dashboard.admin.tags}
                icon={<AiOutlineTag />}
                onClick={onCloseSidebar}
              >
                Tags
              </SidebarLink>
              <SidebarLink
                to={routes.dashboard.admin.evaluations}
                icon={<MdOutlineAutoAwesome />}
                onClick={onCloseSidebar}
              >
                Avaliações
              </SidebarLink>
              <SidebarLink
                to={routes.dashboard.admin.opportunities}
                icon={<MdOutlineLocalOffer />}
                onClick={onCloseSidebar}
              >
                Oportunidades
              </SidebarLink>
              <SidebarLink
                to={routes.dashboard.admin.opportunitiesSearch}
                icon={<AiOutlineFileSearch />}
                onClick={onCloseSidebar}
              >
                Busca de Oportunidades
              </SidebarLink>
              <SidebarLink
                to={routes.dashboard.admin.plannings}
                icon={<HiOutlineDocumentReport />}
                onClick={onCloseSidebar}
              >
                Planejamentos
              </SidebarLink>

              <Separator />
            </>
          )}

          {/* Common menu items for all users */}
          <SidebarLink
            to={routes.dashboard.findOpportunities}
            icon={<BiSearch />}
            onClick={onCloseSidebar}
          >
            Buscar Oportunidades
          </SidebarLink>
          <SidebarLink
            to={routes.dashboard.myPlannings}
            icon={<BiCalendar />}
            onClick={onCloseSidebar}
          >
            Meus Planejamentos
          </SidebarLink>
          <SidebarLink
            to={routes.dashboard.profile}
            icon={<BiUser />}
            onClick={onCloseSidebar}
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
            onLogout();
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
};
