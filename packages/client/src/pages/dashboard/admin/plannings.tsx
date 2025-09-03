import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Table,
  IconButton,
  HStack,
  Badge,
  Tabs,
  Input,
} from '@chakra-ui/react';
import { FiEye, FiDownload, FiTrash2, FiSearch } from 'react-icons/fi';

export const DashboardAdminPlannings: React.FC = () => {
  // Mock data for demonstration
  const plannings = [
    {
      id: '1',
      title: 'Planning Q1 2024',
      user: 'João Silva',
      opportunities: 5,
      status: 'COMPLETED',
      createdAt: '2024-01-10',
      hasPdf: true,
      hasIcs: true,
    },
    {
      id: '2',
      title: 'Innovation Opportunities',
      user: 'Maria Santos',
      opportunities: 8,
      status: 'IN_PROGRESS',
      createdAt: '2024-01-15',
      hasPdf: false,
      hasIcs: false,
    },
    {
      id: '3',
      title: 'Education Editais 2024',
      user: 'Pedro Costa',
      opportunities: 3,
      status: 'COMPLETED',
      createdAt: '2024-01-12',
      hasPdf: true,
      hasIcs: true,
    },
    {
      id: '4',
      title: 'Sustainability Projects',
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
        <Box>
          <Heading
            size='2xl'
            color='fg.emphasized'
            mb='2'
          >
            Plannings
          </Heading>
          <Text color='fg.muted'>View all plannings created by users</Text>
        </Box>

        <HStack gap='4'>
          <Input
            placeholder='Search plannings...'
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

        <Tabs.Root defaultValue='all'>
          <Tabs.List>
            <Tabs.Trigger value='all'>All</Tabs.Trigger>
            <Tabs.Trigger value='completed'>Completed</Tabs.Trigger>
            <Tabs.Trigger value='in_progress'>In Progress</Tabs.Trigger>
            <Tabs.Trigger value='failed'>Failed</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value='all'>
            <Box
              borderWidth='1px'
              borderColor='border.emphasized'
              borderRadius='lg'
              overflow='hidden'
              mt='4'
            >
              <Table.Root
                size='lg'
                variant='outline'
                bg='bg.panel'
              >
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Title</Table.ColumnHeader>
                    <Table.ColumnHeader>User</Table.ColumnHeader>
                    <Table.ColumnHeader>Opportunities</Table.ColumnHeader>
                    <Table.ColumnHeader>Status</Table.ColumnHeader>
                    <Table.ColumnHeader>Created At</Table.ColumnHeader>
                    <Table.ColumnHeader>Files</Table.ColumnHeader>
                    <Table.ColumnHeader width='120px'>Actions</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {plannings.map((planning) => (
                    <Table.Row key={planning.id}>
                      <Table.Cell fontWeight='medium'>{planning.title}</Table.Cell>
                      <Table.Cell>{planning.user}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          colorPalette='blue'
                          variant='subtle'
                        >
                          {planning.opportunities}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{getStatusBadge(planning.status)}</Table.Cell>
                      <Table.Cell>
                        {new Date(planning.createdAt).toLocaleDateString('en-US')}
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap='2'>
                          {planning.hasPdf && (
                            <Badge
                              variant='outline'
                              size='sm'
                            >
                              PDF
                            </Badge>
                          )}
                          {planning.hasIcs && (
                            <Badge
                              variant='outline'
                              size='sm'
                            >
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
                            aria-label='View'
                          >
                            <FiEye />
                          </IconButton>
                          {(planning.hasPdf || planning.hasIcs) && (
                            <IconButton
                              variant='ghost'
                              size='sm'
                              aria-label='Download files'
                              colorPalette='blue'
                            >
                              <FiDownload />
                            </IconButton>
                          )}
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
          </Tabs.Content>

          <Tabs.Content value='completed'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only completed plannings...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='in_progress'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only in progress plannings...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='failed'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only failed plannings...
            </Text>
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  );
};
