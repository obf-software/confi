import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Table,
  IconButton,
  HStack,
  Badge,
  Progress,
  Card,
  SimpleGrid,
  Alert,
} from '@chakra-ui/react';
import { FiPlay, FiRefreshCw, FiEye, FiAlertCircle } from 'react-icons/fi';
import { MdOutlineAutorenew } from 'react-icons/md';

export const DashboardAdminEvaluations: React.FC = () => {
  // Mock data for demonstration
  const currentEvaluation = {
    id: '1',
    status: 'IN_PROGRESS',
    progress: 65,
    startedAt: '2024-01-20T10:30:00',
    estimatedTime: '15 minutos',
    processedOpportunities: 78,
    totalOpportunities: 120,
  };

  const evaluationHistory = [
    {
      id: '1',
      createdAt: '2024-01-20T10:30:00',
      endedAt: '2024-01-20T10:45:00',
      status: 'COMPLETED',
      progress: 100,
      opportunitiesProcessed: 120,
      tagsApplied: 342,
    },
    {
      id: '2',
      createdAt: '2024-01-18T14:20:00',
      endedAt: '2024-01-18T14:32:00',
      status: 'COMPLETED',
      progress: 100,
      opportunitiesProcessed: 98,
      tagsApplied: 276,
    },
    {
      id: '3',
      createdAt: '2024-01-15T09:15:00',
      endedAt: '2024-01-15T09:18:00',
      status: 'FAILED',
      progress: 23,
      opportunitiesProcessed: 22,
      tagsApplied: 0,
    },
    {
      id: '4',
      createdAt: '2024-01-12T16:45:00',
      endedAt: '2024-01-12T17:00:00',
      status: 'COMPLETED',
      progress: 100,
      opportunitiesProcessed: 85,
      tagsApplied: 198,
    },
  ];

  const stats = {
    totalOpportunities: 120,
    untaggedOpportunities: 42,
    totalTags: 67,
    averageTagsPerOpportunity: 2.8,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <Badge
            colorPalette='green'
            variant='subtle'
          >
            Concluída
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

  const getDuration = (startedAt: string, endedAt: string | null) => {
    if (!endedAt) return '-';
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    const minutes = Math.floor((end.getTime() - start.getTime()) / 60000);
    return `${minutes} min`;
  };

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
              Avaliações
            </Heading>
            <Text color='fg.muted'>
              Gerencie o processo de avaliação e atribuição automática de tags às oportunidades
            </Text>
          </Box>
          <Button
            colorPalette='brandPrimaryButton'
            size='lg'
            disabled={currentEvaluation?.status === 'IN_PROGRESS'}
          >
            <FiPlay />
            Nova Avaliação
          </Button>
        </HStack>

        {/* Alert for untagged opportunities */}
        {stats.untaggedOpportunities > 0 && (
          <Alert.Root status='warning'>
            <Alert.Indicator>
              <FiAlertCircle />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>Oportunidades sem tags</Alert.Title>
              <Alert.Description>
                Existem {stats.untaggedOpportunities} oportunidades sem tags. Execute uma nova
                avaliação para atribuir tags automaticamente.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        {/* Current evaluation in progress */}
        {currentEvaluation?.status === 'IN_PROGRESS' && (
          <Card.Root
            borderColor='blue.200'
            borderWidth='2px'
          >
            <Card.Header>
              <HStack justify='space-between'>
                <HStack gap='3'>
                  <Box
                    color='blue.500'
                    animation='spin 2s linear infinite'
                  >
                    <MdOutlineAutorenew size='24' />
                  </Box>
                  <VStack
                    align='start'
                    gap='0'
                  >
                    <Text
                      fontWeight='semibold'
                      fontSize='lg'
                      color='fg.emphasized'
                    >
                      Avaliação em Progresso
                    </Text>
                    <Text
                      fontSize='sm'
                      color='fg.muted'
                    >
                      Iniciada às{' '}
                      {new Date(currentEvaluation.startedAt).toLocaleTimeString('pt-BR')}
                    </Text>
                  </VStack>
                </HStack>
                <VStack
                  align='end'
                  gap='0'
                >
                  <Text
                    fontSize='sm'
                    color='fg.muted'
                  >
                    Tempo estimado
                  </Text>
                  <Text fontWeight='medium'>{currentEvaluation.estimatedTime}</Text>
                </VStack>
              </HStack>
            </Card.Header>
            <Card.Body>
              <VStack gap='4'>
                <Box width='full'>
                  <HStack
                    justify='space-between'
                    mb='2'
                  >
                    <Text
                      fontSize='sm'
                      color='fg.muted'
                    >
                      Progresso: {currentEvaluation.processedOpportunities} de{' '}
                      {currentEvaluation.totalOpportunities} oportunidades
                    </Text>
                    <Text
                      fontWeight='medium'
                      color='blue.500'
                    >
                      {currentEvaluation.progress}%
                    </Text>
                  </HStack>
                  <Progress.Root
                    value={currentEvaluation.progress}
                    colorPalette='blue'
                    size='lg'
                  >
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>
        )}

        {/* Statistics */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          gap='4'
        >
          <Card.Root>
            <Card.Body>
              <VStack
                align='start'
                gap='1'
              >
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Total de Oportunidades
                </Text>
                <Text
                  fontSize='2xl'
                  fontWeight='bold'
                  color='fg.emphasized'
                >
                  {stats.totalOpportunities}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <VStack
                align='start'
                gap='1'
              >
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Sem Tags
                </Text>
                <Text
                  fontSize='2xl'
                  fontWeight='bold'
                  color={stats.untaggedOpportunities > 0 ? 'orange.500' : 'fg.emphasized'}
                >
                  {stats.untaggedOpportunities}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <VStack
                align='start'
                gap='1'
              >
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Total de Tags
                </Text>
                <Text
                  fontSize='2xl'
                  fontWeight='bold'
                  color='fg.emphasized'
                >
                  {stats.totalTags}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <VStack
                align='start'
                gap='1'
              >
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Média Tags/Oportunidade
                </Text>
                <Text
                  fontSize='2xl'
                  fontWeight='bold'
                  color='fg.emphasized'
                >
                  {stats.averageTagsPerOpportunity}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Evaluation history */}
        <Box>
          <Heading
            size='lg'
            color='fg.emphasized'
            mb='4'
          >
            Histórico de Avaliações
          </Heading>
          <Box
            borderWidth='1px'
            borderColor='border.default'
            borderRadius='lg'
            overflow='hidden'
          >
            <Table.Root
              size='lg'
              variant='outline'
            >
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Data/Hora</Table.ColumnHeader>
                  <Table.ColumnHeader>Duração</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Oportunidades</Table.ColumnHeader>
                  <Table.ColumnHeader>Tags Aplicadas</Table.ColumnHeader>
                  <Table.ColumnHeader>Progresso</Table.ColumnHeader>
                  <Table.ColumnHeader width='100px'>Ações</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {evaluationHistory.map((evaluation) => (
                  <Table.Row key={evaluation.id}>
                    <Table.Cell>
                      {new Date(evaluation.createdAt).toLocaleString('pt-BR')}
                    </Table.Cell>
                    <Table.Cell>{getDuration(evaluation.createdAt, evaluation.endedAt)}</Table.Cell>
                    <Table.Cell>{getStatusBadge(evaluation.status)}</Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette='blue'
                        variant='subtle'
                      >
                        {evaluation.opportunitiesProcessed}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {evaluation.tagsApplied > 0 ? (
                        <Badge
                          colorPalette='green'
                          variant='subtle'
                        >
                          {evaluation.tagsApplied}
                        </Badge>
                      ) : (
                        '-'
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Progress.Root
                        value={evaluation.progress}
                        size='sm'
                        width='80px'
                      >
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack gap='2'>
                        <IconButton
                          variant='ghost'
                          size='sm'
                          aria-label='Ver detalhes'
                        >
                          <FiEye />
                        </IconButton>
                        {evaluation.status === 'FAILED' && (
                          <IconButton
                            variant='ghost'
                            size='sm'
                            colorPalette='blue'
                            aria-label='Reexecutar'
                          >
                            <FiRefreshCw />
                          </IconButton>
                        )}
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};
