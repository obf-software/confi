import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  Stat,
  HStack,
  Badge,
  Alert,
} from '@chakra-ui/react';
import { FiSearch, FiTag, FiCheckCircle, FiUsers, FiFileText } from 'react-icons/fi';
import { MdOutlineAutoAwesome } from 'react-icons/md';

export const DashboardAdminHome: React.FC = () => {
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
            Home
          </Heading>
          <Text color='fg.muted'>System overview and administration guide</Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap='6'
        >
          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Total Opportunities</Stat.Label>
                <Stat.ValueText>124</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  23% since last month
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Plannings Created</Stat.Label>
                <Stat.ValueText>45</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  12% since last month
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Active Users</Stat.Label>
                <Stat.ValueText>28</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />8 new this week
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Created Tags</Stat.Label>
                <Stat.ValueText>67</Stat.ValueText>
                <Stat.HelpText>Categorizing opportunities</Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Searches Performed</Stat.Label>
                <Stat.ValueText>312</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  18% since last month
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Conversion Rate</Stat.Label>
                <Stat.ValueText>68%</Stat.ValueText>
                <Stat.HelpText>Searches to plannings</Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* System Flow Guide */}
        <Card.Root>
          <Card.Header>
            <Heading
              size='lg'
              color='fg.emphasized'
            >
              How the System Works
            </Heading>
            <Text
              color='fg.muted'
              mt='2'
            >
              Confi connects organizations to relevant opportunities using artificial intelligence
            </Text>
          </Card.Header>
          <Card.Body>
            <VStack
              align='stretch'
              gap='6'
            >
              {/* Admin Workflow */}
              <Box>
                <HStack mb='4'>
                  <Badge
                    colorPalette='purple'
                    variant='solid'
                    size='lg'
                  >
                    Administrator Flow
                  </Badge>
                </HStack>

                {/* Steps visualization */}
                <HStack
                  gap='2'
                  mb='4'
                  overflowX='auto'
                >
                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiSearch size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Search
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiCheckCircle size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Review
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiTag size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Tags
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.500'
                      color='white'
                    >
                      <MdOutlineAutoAwesome size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                      color='purple.500'
                    >
                      Evaluate
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiUsers size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Available
                    </Text>
                  </VStack>
                </HStack>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 5 }}
                  gap='4'
                  mt='4'
                >
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      1. Search
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Create searches with specific prompts to find opportunities
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      2. Review
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Approve opportunities found before making them available
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      3. Create Tags
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Define categories to classify opportunities
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      4. Evaluate
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      IA assigns tags automatically to opportunities
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      5. Available
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      System ready for users to search for opportunities
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* User Workflow */}
              <Box>
                <HStack mb='4'>
                  <Badge
                    colorPalette='blue'
                    variant='solid'
                    size='lg'
                  >
                    User Flow
                  </Badge>
                </HStack>

                {/* Steps visualization */}
                <HStack
                  gap='2'
                  mb='4'
                  justify='center'
                >
                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.100'
                      color='blue.600'
                    >
                      <FiSearch size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Search
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    maxW='100px'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.100'
                      color='blue.600'
                    >
                      <FiCheckCircle size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Select
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    maxW='100px'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.500'
                      color='white'
                    >
                      <FiFileText size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                      color='blue.500'
                    >
                      Plan
                    </Text>
                  </VStack>
                </HStack>

                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap='4'
                  mt='4'
                >
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      1. Search Opportunities
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Fill out the form with organization information
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      2. Select Relevant
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Choose relevant opportunities
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      3. Generate Planning
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Receive PDF with instructions and deadline calendar
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Admin Responsibilities */}
        <Card.Root>
          <Card.Header>
            <Heading
              size='lg'
              color='fg.emphasized'
            >
              Your Responsibilities as Administrator
            </Heading>
          </Card.Header>
          <Card.Body>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap='6'
            >
              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiSearch size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Keep Opportunities Updated
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Execute searches regularly to find new opportunities. Review and approve before
                  making them available to users.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiTag size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Manage Tagging System
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Create tags that represent well the categories of opportunities. The better the
                  tags, the more accurate the matching will be.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <MdOutlineAutoAwesome size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Run Evaluations
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Run the evaluation process whenever there are opportunities without tags. This
                  ensures that users find results.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiUsers size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Monitor Quality
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Monitor the statistics and plannings created. Adjust tags and searches based on
                  what users are looking for.
                </Text>
              </Box>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        {/* Quick Actions Alert */}
        <Alert.Root status='info'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Quick Start Tip</Alert.Title>
            <Alert.Description>
              To get started: 1) Create an opportunity search, 2) Review and approve those found, 3)
              Create relevant tags, 4) Run an evaluation. Done! The system is configured for users.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </VStack>
    </Box>
  );
};
