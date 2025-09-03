import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Card,
  HStack,
  Badge,
  SimpleGrid,
  IconButton,
  EmptyState,
} from '@chakra-ui/react';
import { FiPlus, FiDownload, FiEye, FiTrash2, FiCalendar, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const DashboardMyPlannings: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const plannings = [
    {
      id: '1',
      title: 'Planejamento Q1 2024',
      opportunities: 5,
      status: 'COMPLETED',
      createdAt: '2024-01-10',
      hasPdf: true,
      hasIcs: true,
    },
    {
      id: '2',
      title: 'Oportunidades de Inovação',
      opportunities: 8,
      status: 'IN_PROGRESS',
      createdAt: '2024-01-15',
      hasPdf: false,
      hasIcs: false,
    },
    {
      id: '3',
      title: 'Editais Educação 2024',
      opportunities: 3,
      status: 'COMPLETED',
      createdAt: '2024-01-12',
      hasPdf: true,
      hasIcs: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge
            colorPalette='green'
            variant='subtle'
          >
            Concluído
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge
            colorPalette='blue'
            variant='subtle'
          >
            Em Progresso
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge
            colorPalette='red'
            variant='subtle'
          >
            Falhou
          </Badge>
        );
      default:
        return <Badge variant='subtle'>{status}</Badge>;
    }
  };

  const handleNewPlanning = () => {
    navigate('/dashboard/find-opportunities');
  };

  if (plannings.length === 0) {
    return (
      <Box>
        <VStack
          align='stretch'
          gap='6'
        >
          <Box>
            <Heading
              size='2xl'
              color='fg.emphasized'
              mb='2'
            >
              Meus Planejamentos
            </Heading>
            <Text color='fg.muted'>Visualize e gerencie seus planejamentos de oportunidades</Text>
          </Box>

          <EmptyState.Root>
            <EmptyState.Content>
              <VStack gap='4'>
                <Box
                  color='fg.muted'
                  fontSize='5xl'
                >
                  <FiFileText />
                </Box>
                <EmptyState.Title>Nenhum planejamento encontrado</EmptyState.Title>
                <EmptyState.Description>
                  Você ainda não criou nenhum planejamento. Comece buscando oportunidades.
                </EmptyState.Description>
                <Button
                  colorPalette='brandPrimaryButton'
                  size='lg'
                  onClick={handleNewPlanning}
                >
                  <FiPlus />
                  Buscar Oportunidades
                </Button>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <VStack
        align='stretch'
        gap='6'
      >
        <HStack justify='space-between'>
          <Box>
            <Heading
              size='2xl'
              color='fg.emphasized'
              mb='2'
            >
              Meus Planejamentos
            </Heading>
            <Text color='fg.muted'>Visualize e gerencie seus planejamentos de oportunidades</Text>
          </Box>
          <Button
            colorPalette='brandPrimaryButton'
            size='lg'
            onClick={handleNewPlanning}
          >
            <FiPlus />
            Novo Planejamento
          </Button>
        </HStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap='6'
        >
          {plannings.map((planning) => (
            <Card.Root key={planning.id}>
              <Card.Header>
                <HStack justify='space-between'>
                  <VStack
                    align='start'
                    gap='1'
                  >
                    <Text
                      fontWeight='semibold'
                      fontSize='lg'
                      color='fg.emphasized'
                    >
                      {planning.title}
                    </Text>
                    <Text
                      fontSize='sm'
                      color='fg.muted'
                    >
                      Criado em {new Date(planning.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                  </VStack>
                  {getStatusBadge(planning.status)}
                </HStack>
              </Card.Header>

              <Card.Body>
                <VStack
                  align='stretch'
                  gap='3'
                >
                  <HStack justify='space-between'>
                    <Text color='fg.muted'>Oportunidades:</Text>
                    <Badge
                      colorPalette='blue'
                      variant='subtle'
                    >
                      {planning.opportunities}
                    </Badge>
                  </HStack>

                  <HStack gap='2'>
                    {planning.hasPdf && (
                      <Badge
                        variant='outline'
                        size='sm'
                      >
                        <FiFileText />
                        PDF
                      </Badge>
                    )}
                    {planning.hasIcs && (
                      <Badge
                        variant='outline'
                        size='sm'
                      >
                        <FiCalendar />
                        Calendário
                      </Badge>
                    )}
                  </HStack>
                </VStack>
              </Card.Body>

              <Card.Footer>
                <HStack
                  gap='2'
                  width='full'
                >
                  <Button
                    variant='outline'
                    flex='1'
                  >
                    <FiEye />
                    Visualizar
                  </Button>
                  {planning.status === 'COMPLETED' && (
                    <IconButton
                      variant='solid'
                      colorPalette='blue'
                      aria-label='Baixar arquivos'
                    >
                      <FiDownload />
                    </IconButton>
                  )}
                  <IconButton
                    variant='ghost'
                    colorPalette='red'
                    aria-label='Excluir'
                  >
                    <FiTrash2 />
                  </IconButton>
                </HStack>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
