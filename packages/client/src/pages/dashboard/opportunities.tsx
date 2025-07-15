import { Button, EmptyState, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineErrorOutline, MdOutlineRocketLaunch } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';

import { toasterStore } from '../../components/toaster';
import { Opportunity } from '../../services/api';
import { OpportunityCard } from '../opportunities/card';
import { useCreatePlanning } from '../opportunities/use-create-planning';

export const DashboardOpportunities: React.FC = () => {
  const [selectedIndexes, setSelectedIndexes] = React.useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as { opportunities?: Opportunity[] } | null | undefined;
  const opportunities = data?.opportunities;
  const createPlanning = useCreatePlanning();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = () => {
    setIsLoading(true);

    const selectedOpportunities = Object.entries(selectedIndexes)
      .filter((index) => index[1])
      .map((index) => opportunities?.[Number(index[0])])
      .filter((o) => o !== undefined);

    createPlanning.mutate(
      selectedOpportunities.map((o) => o.id),
      {
        onSuccess: (planning) => {
          setIsLoading(false);

          void navigate('/dashboard/result', { state: { planning } });
        },
        onError: (error) => {
          setIsLoading(false);

          toasterStore.create({
            id: 'failed-to-create-planning',
            title: 'Não foi possível criar o planejamento',
            description: error.message,
            closable: true,
            type: 'error',
          });
        },
      }
    );
  };

  const numberOfSelectedIndexes = Object.values(selectedIndexes).filter(Boolean).length;

  React.useEffect(() => {
    if (opportunities === undefined) {
      void navigate('/dashboard/search');
    }
  }, [navigate, opportunities]);

  if (!opportunities) return null;

  if (opportunities.length === 0) {
    return (
      <Flex
        minH='50vh'
        alignItems='center'
      >
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
                void navigate('/dashboard/search');
              }}
            >
              Reiniciar busca
              <SlRefresh />
            </Button>
          </EmptyState.Content>
        </EmptyState.Root>
      </Flex>
    );
  }

  return (
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

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        mt='16'
        gapX='4'
        gapY='6'
        w='full'
      >
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
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
          loading={isLoading}
          onClick={onSubmit}
        >
          Crie meu planejamento
          <MdOutlineRocketLaunch />
        </Button>
      </Flex>
    </VStack>
  );
};
