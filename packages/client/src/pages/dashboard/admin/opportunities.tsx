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
  Input,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiEye } from 'react-icons/fi';

export const DashboardAdminOpportunities: React.FC = () => {
  // Mock data for demonstration
  const opportunities = [
    {
      id: '1',
      name: 'Programa de Aceleração Tech',
      deadline: '2024-03-15',
      status: 'ACTIVE',
      tags: ['Tecnologia', 'Startup'],
      searchId: 'search-1',
    },
    {
      id: '2',
      name: 'Bolsa de Estudos Internacional',
      deadline: '2024-04-20',
      status: 'PENDING_REVIEW',
      tags: ['Educação'],
      searchId: null,
    },
    {
      id: '3',
      name: 'Edital de Inovação em Saúde',
      deadline: '2024-03-30',
      status: 'ACTIVE',
      tags: ['Saúde', 'Inovação'],
      searchId: 'search-2',
    },
    {
      id: '4',
      name: 'Fundo de Sustentabilidade',
      deadline: '2024-05-01',
      status: 'DISABLED',
      tags: ['Sustentabilidade'],
      searchId: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <Badge
            colorPalette='green'
            variant='subtle'
          >
            Active
          </Badge>
        );
      case 'PENDING_REVIEW':
        return (
          <Badge
            colorPalette='yellow'
            variant='subtle'
          >
            Under Review
          </Badge>
        );
      case 'DISABLED':
        return (
          <Badge
            colorPalette='gray'
            variant='subtle'
          >
            Disabled
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
              Opportunities
            </Heading>
            <Text color='fg.muted'>Manage all opportunities registered in the system</Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
          >
            <FiPlus />
            New Opportunity
          </Button>
        </HStack>

        <HStack gap='4'>
          <Input
            placeholder='Search opportunities...'
            size='lg'
            flex='1'
          />
          <IconButton
            size='lg'
            aria-label='Search'
          >
            <FiSearch />
          </IconButton>
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
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Deadline</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Tags</Table.ColumnHeader>
                <Table.ColumnHeader>Source</Table.ColumnHeader>
                <Table.ColumnHeader width='120px'>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {opportunities.map((opp) => (
                <Table.Row key={opp.id}>
                  <Table.Cell fontWeight='medium'>{opp.name}</Table.Cell>
                  <Table.Cell>{new Date(opp.deadline).toLocaleDateString('pt-BR')}</Table.Cell>
                  <Table.Cell>{getStatusBadge(opp.status)}</Table.Cell>
                  <Table.Cell>
                    <HStack gap='1'>
                      {opp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant='outline'
                          size='sm'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    {opp.searchId ? (
                      <Badge
                        variant='subtle'
                        size='sm'
                      >
                        Automatic search
                      </Badge>
                    ) : (
                      <Badge
                        variant='subtle'
                        size='sm'
                        colorPalette='gray'
                      >
                        Manual
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap='2'>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='View'
                      >
                        <FiEye />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Edit'
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        colorPalette='red'
                        aria-label='Delete'
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
