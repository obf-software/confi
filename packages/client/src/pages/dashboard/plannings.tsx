import {
  Badge,
  Button,
  Card,
  EmptyState,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiCalendar, BiDownload } from 'react-icons/bi';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { SlRefresh } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';

import { Planning } from '../../services/api';

// Mock data for now - this would come from an API
const mockPlannings: Planning[] = [
  {
    id: '1',
    pdfUrl: '/plannings/planning-1.pdf',
    icsUrl: '/plannings/planning-1.ics',
    status: 'completed',
    createdAt: '2024-01-15',
    title: 'Planejamento para Funding Social',
    opportunities: ['Opportunity 1', 'Opportunity 2', 'Opportunity 3'],
  },
  {
    id: '2',
    pdfUrl: '/plannings/planning-2.pdf',
    icsUrl: '/plannings/planning-2.ics',
    status: 'in_progress',
    createdAt: '2024-01-20',
    title: 'Oportunidades Europeias',
    opportunities: ['EU Grant Program', 'Innovation Fund'],
  },
];

interface PlanningCardProps {
  planning: Planning;
}

const PlanningCard: React.FC<PlanningCardProps> = ({ planning }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in_progress':
        return 'blue';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em andamento';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Card.Root
      variant='elevated'
      size='lg'
    >
      <Card.Header>
        <HStack justify='space-between'>
          <VStack
            align='flex-start'
            gap='1'
          >
            <Heading size='md'>{planning.title}</Heading>
            <Text
              fontSize='sm'
              color='gray.600'
            >
              Criado em{' '}
              {planning.createdAt
                ? new Date(planning.createdAt).toLocaleDateString('pt-BR')
                : 'Data não disponível'}
            </Text>
          </VStack>
          <Badge
            colorPalette={getStatusColor(planning.status || 'unknown')}
            variant='subtle'
          >
            {getStatusText(planning.status || 'unknown')}
          </Badge>
        </HStack>
      </Card.Header>

      <Card.Body>
        <VStack
          align='flex-start'
          gap='3'
        >
          <Text
            fontSize='sm'
            color='gray.700'
          >
            <b>Oportunidades:</b> {planning.opportunities?.join(', ') || 'Nenhuma oportunidade'}
          </Text>
        </VStack>
      </Card.Body>

      <Card.Footer>
        <HStack
          gap='2'
          w='full'
        >
          {planning.status === 'completed' && (
            <>
              <Link
                href={planning.pdfUrl}
                target='_blank'
                flex='1'
              >
                <Button
                  size='sm'
                  variant='outline'
                  w='full'
                >
                  <BiDownload />
                  PDF
                </Button>
              </Link>
              <Link
                href={planning.icsUrl}
                target='_blank'
                flex='1'
              >
                <Button
                  size='sm'
                  variant='outline'
                  w='full'
                >
                  <BiCalendar />
                  Calendário
                </Button>
              </Link>
            </>
          )}
          {planning.status === 'in_progress' && (
            <Text
              fontSize='sm'
              color='blue.600'
              textAlign='center'
              w='full'
            >
              Planejamento sendo processado...
            </Text>
          )}
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export const DashboardPlannings: React.FC = () => {
  const navigate = useNavigate();
  const plannings = mockPlannings; // This would come from an API

  if (plannings.length === 0) {
    return (
      <Flex
        minH='50vh'
        alignItems='center'
      >
        <EmptyState.Root size='lg'>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <MdOutlineBusinessCenter />
            </EmptyState.Indicator>
            <VStack
              textAlign='center'
              gap='6'
            >
              <EmptyState.Title fontSize='4xl'>Nenhum planejamento encontrado</EmptyState.Title>
              <EmptyState.Description
                fontSize='xl'
                lineHeight='1'
              >
                Você ainda não criou nenhum planejamento. Que tal começar buscando algumas
                oportunidades?
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
              Buscar oportunidades
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
        fontSize='4xl'
        lineHeight='1'
        fontWeight='normal'
      >
        Meus <b>Planejamentos</b>
      </Heading>

      <Text
        fontSize='lg'
        color='gray.600'
      >
        Aqui estão todos os seus planejamentos de oportunidades criados
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap='6'
        w='full'
      >
        {plannings.map((planning) => (
          <PlanningCard
            key={planning.id}
            planning={planning}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
