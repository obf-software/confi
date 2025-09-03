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
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

export const DashboardAdminTags: React.FC = () => {
  // Mock data for demonstration
  const tags = [
    {
      id: '1',
      name: 'Technology',
      description: 'Opportunities related to technology',
      count: 45,
    },
    { id: '2', name: 'Education', description: 'Education opportunities', count: 32 },
    { id: '3', name: 'Health', description: 'Opportunities in the health area', count: 28 },
    { id: '4', name: 'Sustainability', description: 'Sustainability projects', count: 19 },
  ];

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
              Tags
            </Heading>
            <Text color='fg.muted'>Manage tags to categorize opportunities</Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
          >
            <FiPlus />
            New Tag
          </Button>
        </HStack>

        <HStack gap='4'>
          <Input
            placeholder='Search tags...'
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
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader>Opportunities</Table.ColumnHeader>
                <Table.ColumnHeader width='100px'>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tags.map((tag) => (
                <Table.Row key={tag.id}>
                  <Table.Cell fontWeight='medium'>{tag.name}</Table.Cell>
                  <Table.Cell color='fg.muted'>{tag.description}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette='blue'
                      variant='subtle'
                    >
                      {tag.count}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap='2'>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        aria-label='Edit tag'
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        colorPalette='red'
                        aria-label='Delete tag'
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
