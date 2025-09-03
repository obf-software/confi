import { Button, Container, EmptyState, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineErrorOutline, MdOutlineRocketLaunch } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router-dom';

import { OpportunityCard } from './card';
import { Opportunity } from '../../../services/api';
import { useCreatePlanning } from '../../../hooks/use-create-planning';
import { useToaster } from '../../../contexts/toaster';
import { routes } from '../../../lib/routes';
import { queryClient } from '../../../lib/query-client';
import { Tooltip } from '../../../components/tooltip';

export const DashboardCreatePlanning: React.FC = () => {
  const [selectedIndexes, setSelectedIndexes] = React.useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as { opportunities?: Opportunity[] } | null | undefined;
  const opportunities = data?.opportunities;
  const createPlanning = useCreatePlanning();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const toaster = useToaster();

  const onSubmit = () => {
    setIsLoading(true);

    const selectedOpportunities = Object.entries(selectedIndexes)
      .filter((index) => index[1])
      .map((index) => opportunities?.[Number(index[0])])
      .filter((o) => o !== undefined);

    createPlanning.mutate(
      {
        planning: {
          opportunityIds: selectedOpportunities.map((o) => o.id),
          title: `Planning ${new Date().toLocaleDateString('en-US')}`,
        },
      },
      {
        onSuccess: (planning) => {
          toaster.create({
            id: 'success-to-create-planning',
            title: 'Planning created successfully',
            description: 'The planning was created successfully',
            closable: true,
            type: 'success',
          });
        },
        onSettled: () => {
          setIsLoading(false);

          queryClient.invalidateQueries({ queryKey: ['listMyPlannings'] });

          void navigate(routes.dashboard.myPlannings);
        },
        onError: (error) => {
          setIsLoading(false);

          toaster.create({
            id: 'failed-to-create-planning',
            title: 'Unable to create the planning',
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
      void navigate(routes.dashboard.findOpportunities);
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
                <EmptyState.Title fontSize='4xl'>We need more information</EmptyState.Title>
                <EmptyState.Description
                  fontSize='xl'
                  lineHeight='1'
                >
                  We were not able to find opportunities aligned to the information you provided. We
                  recommend that you review the information and include more details.
                </EmptyState.Description>
              </VStack>
              <Button
                colorPalette='teal'
                color='white'
                rounded='full'
                size='xl'
                onClick={() => {
                  void navigate(routes.dashboard.findOpportunities);
                }}
              >
                Restart
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
            Here are the opportunities mapped <b>for you</b>
          </Heading>

          <Heading
            as='h2'
            fontSize='2xl'
            lineHeight='1'
            textAlign='left'
            fontWeight='normal'
          >
            select up to 4 opportunities that most interest you and I will create a custom
            application planning
          </Heading>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          mt='16'
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
          <Tooltip
            content='You can select up to 4 opportunities'
            disabled={numberOfSelectedIndexes !== 0 && numberOfSelectedIndexes <= 4}
            showArrow
            openDelay={0}
            closeDelay={2000}
          >
            <Button
              colorPalette='teal'
              color='white'
              size='xl'
              rounded='full'
              disabled={numberOfSelectedIndexes === 0 || numberOfSelectedIndexes > 4}
              loading={isLoading}
              onClick={onSubmit}
            >
              Create my planning
              <MdOutlineRocketLaunch />
            </Button>
          </Tooltip>
        </Flex>
      </Container>
    </Flex>
  );
};
