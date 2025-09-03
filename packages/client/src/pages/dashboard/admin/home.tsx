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

interface FlowItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FlowItem: React.FC<FlowItemProps> = ({ icon, title, description, color }) => {
  return (
    <VStack
      gap='1'
      justify='flex-start'
      align='flex-start'
    >
      <Box
        p='3'
        borderRadius='full'
        bg={`${color}.100`}
        color={`${color}.600`}
      >
        {icon}
      </Box>

      <Text
        fontSize='md'
        fontWeight='semibold'
      >
        {title}
      </Text>

      <Text
        fontSize='md'
        color='fg.muted'
        mt='1'
      >
        {description}
      </Text>
    </VStack>
  );
};

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
          <Card.Root bg='bg.emphasized'>
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

          <Card.Root bg='bg.emphasized'>
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

          <Card.Root bg='bg.emphasized'>
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

          <Card.Root bg='bg.emphasized'>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Created Tags</Stat.Label>
                <Stat.ValueText>67</Stat.ValueText>
                <Stat.HelpText>Categorizing opportunities</Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root bg='bg.emphasized'>
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

          <Card.Root bg='bg.emphasized'>
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
                <HStack mb='6'>
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
                  mb='4'
                  justify='space-between'
                  align='center'
                >
                  <FlowItem
                    icon={<FiSearch size='20' />}
                    title='Search'
                    description='Create searches with specific prompts to find opportunities'
                    color='purple'
                  />
                  <FlowItem
                    icon={<FiCheckCircle size='20' />}
                    title='Review'
                    description='Approve opportunities found before making them available'
                    color='purple'
                  />
                  <FlowItem
                    icon={<FiTag size='20' />}
                    title='Tags'
                    description='Define categories to classify opportunities'
                    color='purple'
                  />
                  <FlowItem
                    icon={<MdOutlineAutoAwesome size='20' />}
                    title='Evaluate'
                    description='IA assigns tags automatically to opportunities'
                    color='purple'
                  />
                  <FlowItem
                    icon={<FiUsers size='20' />}
                    title='Available'
                    description='System ready for users to search for opportunities'
                    color='purple'
                  />
                </HStack>
              </Box>

              {/* User Workflow */}
              <Box>
                <HStack mb='6'>
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
                  mb='4'
                  justify='space-between'
                  align='center'
                >
                  <FlowItem
                    icon={<FiSearch size='20' />}
                    title='Search'
                    description='Fill out the form with organization information'
                    color='blue'
                  />
                  <FlowItem
                    icon={<FiCheckCircle size='20' />}
                    title='Select'
                    description='Choose relevant opportunities'
                    color='blue'
                  />
                  <FlowItem
                    icon={<FiFileText size='20' />}
                    title='Plan'
                    description='Receive PDF with instructions and deadline calendar'
                    color='blue'
                  />
                </HStack>
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
                  fontSize='md'
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
                  fontSize='md'
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
                  fontSize='md'
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
                  fontSize='md'
                  color='fg.muted'
                >
                  Monitor the statistics and plannings created. Adjust tags and searches based on
                  what users are looking for.
                </Text>
              </Box>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};
