import { Button, Container, EmptyState, Flex, Link, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiCalendar, BiDownload } from 'react-icons/bi';
import { MdWhatsapp } from 'react-icons/md';
import { SiNicehash } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';

import { buildAbsolutePath } from '../../helpers/build-absolute-path';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as
    | {
        planningPdfFileUrl: string;
        planningCalendarFileUrl: string;
      }
    | null
    | undefined;

  React.useEffect(() => {
    if (!data) {
      void navigate(buildAbsolutePath('/'));
    }
  }, [navigate, data]);

  if (!data) return null;

  return (
    <Flex
      minH='100vh'
      alignItems='center'
    >
      <Container maxW='8xl'>
        <EmptyState.Root size='lg'>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <SiNicehash />
            </EmptyState.Indicator>

            <VStack
              textAlign='center'
              gap='6'
            >
              <EmptyState.Title fontSize='4xl'>Prontinho!</EmptyState.Title>
              <EmptyState.Description
                fontSize='xl'
                lineHeight='1'
              >
                Você pode baixar o panejamento em pdf, adicionar à sua agenda do google e também
                entrar em nosso grupo de oportunidades
              </EmptyState.Description>
            </VStack>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify='center'
              align='center'
              gap='4'
            >
              <Link
                href={data.planningPdfFileUrl}
                target='_blank'
                textDecoration='none'
              >
                <Button
                  colorPalette='brandPrimaryButton'
                  size='xl'
                  rounded='full'
                >
                  Baixar Planejamento
                  <BiDownload />
                </Button>
              </Link>

              <Link
                href={data.planningCalendarFileUrl}
                target='_blank'
                textDecoration='none'
              >
                <Button
                  colorPalette='brandPrimaryButton'
                  size='xl'
                  rounded='full'
                >
                  Adicionar ao Google Calendar
                  <BiCalendar />
                </Button>
              </Link>

              <Link
                href='https://wa.me/5541996892354'
                target='_blank'
                textDecoration='none'
              >
                <Button
                  colorPalette='brandPrimaryButton'
                  size='xl'
                  rounded='full'
                >
                  Grupo de Oportunidades
                  <MdWhatsapp />
                </Button>
              </Link>
            </Stack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Container>
    </Flex>
  );
};
