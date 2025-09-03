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
import { routes } from '../../../lib/routes';
import { useListMyPlannings } from '../../../hooks/use-list-my-plannings';
import { toasterStore, useToaster } from '../../../contexts/toaster';

export const DashboardMyPlannings: React.FC = () => {
  const navigate = useNavigate();
  const toaster = useToaster();
  const planningsQuery = useListMyPlannings();
  const plannings = planningsQuery.data ?? [];

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

  const handleNewPlanning = () => {
    navigate(routes.dashboard.findOpportunities);
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
              My Plannings
            </Heading>
            <Text color='fg.muted'>View and manage your opportunity plannings</Text>
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
                <EmptyState.Title>No plannings found</EmptyState.Title>
                <EmptyState.Description>
                  You haven't created any plannings yet. Start by searching for opportunities.
                </EmptyState.Description>
                <Button
                  colorPalette='teal'
                  size='lg'
                  onClick={handleNewPlanning}
                >
                  <FiPlus />
                  Search Opportunities
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
              My Plannings
            </Heading>
            <Text color='fg.muted'>View and manage your opportunity plannings</Text>
          </Box>
          <Button
            colorPalette='teal'
            size='lg'
            onClick={handleNewPlanning}
          >
            <FiPlus />
            New Planning
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
                      Created on {new Date(planning.createdAt).toLocaleDateString('en-US')}
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
                    <Text color='fg.muted'>Opportunities:</Text>
                    <Badge
                      colorPalette='blue'
                      variant='subtle'
                    >
                      {planning.opportunityIds.length}
                    </Badge>
                  </HStack>

                  <HStack gap='2'>
                    <Badge
                      variant='outline'
                      size='sm'
                    >
                      <FiFileText />
                      PDF
                    </Badge>
                    <Badge
                      variant='outline'
                      size='sm'
                    >
                      <FiCalendar />
                      Calendar
                    </Badge>
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
                    aria-label='Download pdf'
                    disabled={planning.pdfFileUrl === null || planning.status !== 'COMPLETED'}
                    onClick={() => {
                      if (!planning.pdfFileUrl) {
                        toaster.create({
                          id: 'failed-to-download-pdf',
                          title: 'Unable to download pdf',
                          description: 'The pdf file is not available',
                          closable: true,
                          type: 'error',
                        });
                        return;
                      }

                      window.open(planning.pdfFileUrl, '_blank');
                    }}
                  >
                    <FiDownload />
                    PDF
                  </Button>

                  <Button
                    variant='outline'
                    flex='1'
                    colorPalette='gray'
                    aria-label='Download calendar'
                    disabled={planning.icsFileUrl === null || planning.status !== 'COMPLETED'}
                    onClick={() => {
                      if (!planning.icsFileUrl) {
                        toaster.create({
                          id: 'failed-to-download-ics',
                          title: 'Unable to download ics',
                          description: 'The ics file is not available',
                          closable: true,
                          type: 'error',
                        });
                        return;
                      }

                      window.open(planning.icsFileUrl, '_blank');
                    }}
                  >
                    <FiDownload />
                    Calendar
                  </Button>
                </HStack>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
