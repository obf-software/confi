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
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export const DashboardAdminTags: React.FC = () => {
  // Mock data for demonstration
  const tags = [
    {
      id: '1',
      name: 'Tecnologia',
      description: 'Oportunidades relacionadas a tecnologia',
      count: 45,
    },
    { id: '2', name: 'Educação', description: 'Oportunidades educacionais', count: 32 },
    { id: '3', name: 'Saúde', description: 'Oportunidades na área de saúde', count: 28 },
    { id: '4', name: 'Sustentabilidade', description: 'Projetos sustentáveis', count: 19 },
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
            <Text color='fg.muted'>Gerencie as tags para categorizar oportunidades</Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
          >
            <FiPlus />
            Nova Tag
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
                <Table.ColumnHeader>Descrição</Table.ColumnHeader>
                <Table.ColumnHeader>Oportunidades</Table.ColumnHeader>
                <Table.ColumnHeader width='100px'>Ações</Table.ColumnHeader>
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
                        aria-label='Editar tag'
                      >
                        <FiEdit2 />
                      </IconButton>
                      <IconButton
                        variant='ghost'
                        size='sm'
                        colorPalette='red'
                        aria-label='Excluir tag'
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
