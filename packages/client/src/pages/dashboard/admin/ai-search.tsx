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
import { FiEdit2, FiTrash2, FiPlus, FiPlay, FiRefreshCw, FiSearch } from 'react-icons/fi';

export const DashboardAdminAiSearch: React.FC = () => {
  // Mock data for demonstration
  const searches = [
    {
      id: '1',
      name: 'Search - Tech Startups',
      prompt: 'Find opportunities for tech startups...',
      status: 'COMPLETED',
      opportunities: 12,
      lastRun: '2024-01-15',
    },
    {
      id: '2',
      name: 'Search - Government Editais',
      prompt: 'Find government editais for innovation...',
      status: 'IN_PROGRESS',
      opportunities: null,
      lastRun: '2024-01-20',
    },
    {
      id: '3',
      name: 'Search - International Scholarships',
      prompt: 'Identify international study scholarships...',
      status: 'DRAFT',
      opportunities: null,
      lastRun: null,
    },
    {
      id: '4',
      name: 'Search - Sustainability',
      prompt: 'Opportunities in sustainability projects...',
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
            Completed
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge
            colorPalette='blue'
            variant='subtle'
          >
            In Progress
          </Badge>
        );
      case 'DRAFT':
        return (
          <Badge
            colorPalette='gray'
            variant='subtle'
          >
            Draft
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge
            colorPalette='red'
            variant='subtle'
          >
            Failed
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
              AI Search
            </Heading>
            <Text color='fg.muted'>
              Configure and execute automatic searches for opportunities using AI
            </Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
          >
            <FiPlus />
            New Search
          </Button>
        </HStack>

        <HStack gap='4'>
          <Input
            placeholder='Search...'
            size='lg'
            flex='1'
          />
          <IconButton
            size='lg'
            aria-label='Search'
            variant='outline'
            colorPalette='black'
          >
            <FiSearch />
          </IconButton>
        </HStack>

        <Box
          borderWidth='1px'
          borderColor='border.emphasized'
          borderRadius='lg'
          overflow='hidden'
        >
          <Table.Root
            size='lg'
            variant='outline'
            bg='bg.panel'
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Prompt</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Opportunities</Table.ColumnHeader>
                <Table.ColumnHeader>Last Execution</Table.ColumnHeader>
                <Table.ColumnHeader width='150px'>Actions</Table.ColumnHeader>
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
                    {search.lastRun ? new Date(search.lastRun).toLocaleDateString('en-US') : '-'}
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap='2'>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Execute search'
                        colorPalette='green'
                      >
                        <FiPlay />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Execute again'
                      >
                        <FiRefreshCw />
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
