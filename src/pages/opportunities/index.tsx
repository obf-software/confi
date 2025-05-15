import { Button, Container, EmptyState, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineErrorOutline, MdOutlineRocketLaunch } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';

import { buildAbsolutePath } from '../../helpers/build-absolute-path';
import { Opportunity } from '../../services/opportunity';
import { OpportunityCard } from './card';

export const Opportunities: React.FC = () => {
  const [selectedIndexes, setSelectedIndexes] = React.useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as { opportunities?: Opportunity[] } | null | undefined;
  const opportunities = data?.opportunities;

  const onSubmit = () => {
    console.log('submit', selectedIndexes, opportunities);

    void navigate(buildAbsolutePath('result'), {
      state: {
        planningPdfFileUrl: 'https://google.com',
        planningCalendarFileUrl: 'https://google.com',
      },
    });
  };

  const numberOfSelectedIndexes = Object.values(selectedIndexes).filter(Boolean).length;

  React.useEffect(() => {
    if (opportunities === undefined) {
      void navigate(buildAbsolutePath('/'));
    }
  }, [navigate, opportunities]);

  if (!opportunities) return null;

  if (opportunities.length === 0) {
    return (
      <Flex
        minH='100vh'
        alignItems='center'
      >
        <Container maxW='8xl'>
          <EmptyState.Root size='lg'>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <MdOutlineErrorOutline />
              </EmptyState.Indicator>
              <VStack
                textAlign='center'
                gap='6'
              >
                <EmptyState.Title fontSize='4xl'>
                  Eita, precisamos de mais informações
                </EmptyState.Title>
                <EmptyState.Description
                  fontSize='xl'
                  lineHeight='1'
                >
                  Não conseguimos encontrar oportunidades alinhadas às informações que você nos
                  informou. Recomendamos que revise as informações e inclua mais detalhes
                </EmptyState.Description>
              </VStack>
              <Button
                colorPalette='brandPrimaryButton'
                color='white'
                rounded='full'
                size='xl'
                onClick={() => {
                  void navigate(buildAbsolutePath('search'));
                }}
              >
                Reiniciar
                <SlRefresh />
              </Button>
            </EmptyState.Content>
          </EmptyState.Root>
        </Container>
      </Flex>
    );
  }

  return (
    <Flex
      minH='100vh'
      py='16'
    >
      <Container maxW='8xl'>
        <VStack
          align='flex-start'
          gap='6'
        >
          <Heading
            as='h1'
            fontSize='5xl'
            lineHeight='1'
            textAlign='left'
            fontWeight='normal'
          >
            Aqui estão as oportunidades mapeadas <b>para você</b>
          </Heading>

          <Heading
            as='h2'
            fontSize='2xl'
            lineHeight='1'
            textAlign='left'
            fontWeight='normal'
          >
            selecione até 4 oportunidades que mais te interessam e vou criar um planejamento de
            application customizado
          </Heading>
        </VStack>

        <SimpleGrid
          mt='16'
          columns={{ base: 1, md: 2, lg: 3 }}
          gapX='4'
          gapY='6'
        >
          {opportunities.map((opportunity, index) => (
            <OpportunityCard
              data={opportunity}
              checked={!!selectedIndexes[index.toString()]}
              onCheckedChange={(checked) => {
                setSelectedIndexes((prev) => ({ ...prev, [index.toString()]: checked }));
              }}
            />
          ))}
        </SimpleGrid>

        <Flex
          mt='12'
          w='100%'
          justify='center'
        >
          <Button
            colorPalette='brandPrimaryButton'
            color='white'
            size='xl'
            rounded='full'
            disabled={numberOfSelectedIndexes === 0 || numberOfSelectedIndexes > 4}
            onClick={onSubmit}
          >
            Crie meu planejamento
            <MdOutlineRocketLaunch />
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};
