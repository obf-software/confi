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
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiPlay, FiRefreshCw } from 'react-icons/fi';

export const DashboardAdminAiSearch: React.FC = () => {
  // Mock data for demonstration
  const searches = [
    {
      id: '1',
      name: 'Busca - Startups Tech',
      prompt: 'Encontrar oportunidades para startups de tecnologia...',
      status: 'COMPLETED',
      opportunities: 12,
      lastRun: '2024-01-15',
    },
    {
      id: '2',
      name: 'Busca - Editais Governo',
      prompt: 'Buscar editais governamentais para inovação...',
      status: 'IN_PROGRESS',
      opportunities: null,
      lastRun: '2024-01-20',
    },
    {
      id: '3',
      name: 'Busca - Bolsas Internacionais',
      prompt: 'Identificar bolsas de estudo internacionais...',
      status: 'DRAFT',
      opportunities: null,
      lastRun: null,
    },
    {
      id: '4',
      name: 'Busca - Sustentabilidade',
      prompt: 'Oportunidades em projetos de sustentabilidade...',
      status: 'FAILED',
      opportunities: 0,
      lastRun: '2024-01-18',
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
      case 'DRAFT':
        return (
          <Badge
            colorPalette='gray'
            variant='subtle'
          >
            Rascunho
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
              Busca de Oportunidades
            </Heading>
            <Text color='fg.muted'>Configure e execute buscas automáticas de oportunidades</Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
          >
            <FiPlus />
            Nova Busca
          </Button>
        </HStack>

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
                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                <Table.ColumnHeader>Prompt</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Oportunidades</Table.ColumnHeader>
                <Table.ColumnHeader>Última Execução</Table.ColumnHeader>
                <Table.ColumnHeader width='150px'>Ações</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {searches.map((search) => (
                <Table.Row key={search.id}>
                  <Table.Cell fontWeight='medium'>{search.name}</Table.Cell>
                  <Table.Cell>
                    <Text
                      truncate
                      maxW='300px'
                      color='fg.muted'
                    >
                      {search.prompt}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>{getStatusBadge(search.status)}</Table.Cell>
                  <Table.Cell>
                    {search.opportunities !== null ? (
                      <Badge
                        colorPalette='blue'
                        variant='subtle'
                      >
                        {search.opportunities}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {search.lastRun ? new Date(search.lastRun).toLocaleDateString('pt-BR') : '-'}
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap='2'>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Executar busca'
                        colorPalette='green'
                      >
                        <FiPlay />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Reexecutar'
                      >
                        <FiRefreshCw />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Editar'
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        colorPalette='red'
                        aria-label='Excluir'
                      >
                        <FiTrash2 />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </VStack>
    </Box>
  );
};
