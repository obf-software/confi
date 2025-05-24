import { Button, Container, EmptyState, Flex, Link, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiCalendar, BiDownload } from 'react-icons/bi';
import { MdWhatsapp } from 'react-icons/md';
import { SiNicehash } from 'react-icons/si';
import { SlRefresh } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';

import { buildPath } from '../../helpers/build-path';
import { downloadBlob } from '../../helpers/download-blob';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as
    | {
        calendarFile: Blob;
        planningFile: Blob;
      }
    | null
    | undefined;

  console.log(data);

  React.useEffect(() => {
    if (!data) {
      void navigate(buildPath('/'));
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
              <Button
                colorPalette='brandPrimaryButton'
                size='xl'
                rounded='full'
                onClick={() => {
                  console.log('baixar planejamento');
                  downloadBlob(data.planningFile, 'planejamento.pdf');
                }}
              >
                Baixar Planejamento
                <BiDownload />
              </Button>

              <Button
                colorPalette='brandPrimaryButton'
                size='xl'
                rounded='full'
                onClick={() => {
                  downloadBlob(data.calendarFile, 'planejamento.ics');
                }}
              >
                Adicionar ao Google Calendar
                <BiCalendar />
              </Button>

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

              <Button
                colorPalette='brandPrimaryButton'
                rounded='full'
                size='xl'
                onClick={() => {
                  void navigate(buildPath('search'));
                }}
              >
                Reiniciar
                <SlRefresh />
              </Button>
            </Stack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Container>
    </Flex>
  );
};
