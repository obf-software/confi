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
  Tabs,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiEye } from 'react-icons/fi';

export const DashboardAdminOpportunities: React.FC = () => {
  // Mock data for demonstration
  const opportunities = [
    {
      id: '1',
      name: 'Acceleration Program Tech',
      deadline: '2024-03-15',
      status: 'ACTIVE',
      tags: ['Technology', 'Startup'],
      searchId: 'search-1',
    },
    {
      id: '2',
      name: 'International Studies Scholarship',
      deadline: '2024-04-20',
      status: 'PENDING_REVIEW',
      tags: ['Education'],
      searchId: null,
    },
    {
      id: '3',
      name: 'Innovation in Health Edital',
      deadline: '2024-03-30',
      status: 'ACTIVE',
      tags: ['Health', 'Innovation'],
      searchId: 'search-2',
    },
    {
      id: '4',
      name: 'Sustainability Fund',
      deadline: '2024-05-01',
      status: 'DISABLED',
      tags: ['Sustainability'],
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
            variant='outline'
            colorPalette='black'
          >
            <FiSearch />
          </IconButton>
        </HStack>

        <Tabs.Root defaultValue='all'>
          <Tabs.List>
            <Tabs.Trigger value='all'>All</Tabs.Trigger>
            <Tabs.Trigger value='active'>Active</Tabs.Trigger>
            <Tabs.Trigger value='under_review'>Under Review</Tabs.Trigger>
            <Tabs.Trigger value='disabled'>Disabled</Tabs.Trigger>
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
                      <Table.Cell>{new Date(opp.deadline).toLocaleDateString('en-US')}</Table.Cell>
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
          </Tabs.Content>

          <Tabs.Content value='active'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only active opportunities...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='under_review'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only under review opportunities...
            </Text>
          </Tabs.Content>

          <Tabs.Content value='disabled'>
            <Text
              color='fg.muted'
              mt='4'
            >
              Showing only disabled opportunities...
            </Text>
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  );
};
