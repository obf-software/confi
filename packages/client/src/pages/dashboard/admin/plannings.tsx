import React from 'react';
import { Box, Heading, Text, VStack, Table, IconButton, HStack, Badge, Tabs, Input } from '@chakra-ui/react';
import { FiEye, FiDownload, FiTrash2, FiSearch } from 'react-icons/fi';

export const DashboardAdminPlannings: React.FC = () => {
  // Mock data for demonstration
  const plannings = [
    {
      id: '1',
      title: 'Planejamento Q1 2024',
      user: 'João Silva',
      opportunities: 5,
      status: 'COMPLETED',
      createdAt: '2024-01-10',
      hasPdf: true,
      hasIcs: true,
    },
    {
      id: '2',
      title: 'Oportunidades de Inovação',
      user: 'Maria Santos',
      opportunities: 8,
      status: 'IN_PROGRESS',
      createdAt: '2024-01-15',
      hasPdf: false,
      hasIcs: false,
    },
    {
      id: '3',
      title: 'Editais Educação 2024',
      user: 'Pedro Costa',
      opportunities: 3,
      status: 'COMPLETED',
      createdAt: '2024-01-12',
      hasPdf: true,
      hasIcs: true,
    },
    {
      id: '4',
      title: 'Projetos Sustentáveis',
      user: 'Ana Oliveira',
      opportunities: 6,
      status: 'FAILED',
      createdAt: '2024-01-18',
      hasPdf: false,
      hasIcs: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge colorPalette='green' variant='subtle'>Concluído</Badge>;
      case 'IN_PROGRESS':
        return <Badge colorPalette='blue' variant='subtle'>Em Progresso</Badge>;
      case 'FAILED':
        return <Badge colorPalette='red' variant='subtle'>Falhou</Badge>;
      default:
        return <Badge variant='subtle'>{status}</Badge>;
    }
  };

  return (
    <Box>
      <VStack align='stretch' gap='6'>
        <Box>
          <Heading size='2xl' color='fg.emphasized' mb='2'>
            Planejamentos
          </Heading>
          <Text color='fg.muted'>
            Visualize todos os planejamentos criados pelos usuários
          </Text>
        </Box>

        <HStack gap='4'>
          <Input
            placeholder='Buscar planejamentos...'
            size='lg'
            flex='1'
          />
          <IconButton size='lg' aria-label='Buscar'>
            <FiSearch />
          </IconButton>
        </HStack>

        <Tabs.Root defaultValue='all'>
          <Tabs.List>
            <Tabs.Trigger value='all'>Todos</Tabs.Trigger>
            <Tabs.Trigger value='completed'>Concluídos</Tabs.Trigger>
            <Tabs.Trigger value='in_progress'>Em Progresso</Tabs.Trigger>
            <Tabs.Trigger value='failed'>Com Falha</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value='all'>
            <Box borderWidth='1px' borderColor='border.default' borderRadius='lg' overflow='hidden' mt='4'>
              <Table.Root size='lg' variant='outline'>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Título</Table.ColumnHeader>
                    <Table.ColumnHeader>Usuário</Table.ColumnHeader>
                    <Table.ColumnHeader>Oportunidades</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Criado em</Table.ColumnHeader>
                    <Table.ColumnHeader>Arquivos</Table.ColumnHeader>
                    <Table.ColumnHeader width='120px'>Ações</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {plannings.map((planning) => (
                    <Table.Row key={planning.id}>
                      <Table.Cell fontWeight='medium'>{planning.title}</Table.Cell>
                      <Table.Cell>{planning.user}</Table.Cell>
                      <Table.Cell>
                        <Badge colorPalette='blue' variant='subtle'>
                          {planning.opportunities}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{getStatusBadge(planning.status)}</Table.Cell>
                      <Table.Cell>{new Date(planning.createdAt).toLocaleDateString('pt-BR')}</Table.Cell>
                      <Table.Cell>
                        <HStack gap='2'>
                          {planning.hasPdf && (
                            <Badge variant='outline' size='sm'>
                              PDF
                            </Badge>
                          )}
                          {planning.hasIcs && (
                            <Badge variant='outline' size='sm'>
                              ICS
                            </Badge>
                          )}
                          {!planning.hasPdf && !planning.hasIcs && '-'}
                        </HStack>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap='2'>
                          <IconButton
                            variant='ghost'
                            size='sm'
                            aria-label='Visualizar'
                          >
                            <FiEye />
                          </IconButton>
                          {(planning.hasPdf || planning.hasIcs) && (
                            <IconButton
                              variant='ghost'
                              size='sm'
                              aria-label='Baixar arquivos'
                              colorPalette='blue'
                            >
                              <FiDownload />
                            </IconButton>
                          )}
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
          </Tabs.Content>

          <Tabs.Content value='completed'>
            <Text color='fg.muted' mt='4'>
              Mostrando apenas planejamentos concluídos...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='in_progress'>
            <Text color='fg.muted' mt='4'>
              Mostrando apenas planejamentos em progresso...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='failed'>
            <Text color='fg.muted' mt='4'>
              Mostrando apenas planejamentos com falha...
            </Text>
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  );
};