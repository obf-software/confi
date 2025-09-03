import {
  Avatar,
  Box,
  Container,
  Flex,
  FlexProps,
  Float,
  GridItem,
  Heading,
  Icon,
  LinkOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa6';

export type DetailsProps = FlexProps;

export const Details: React.FC<DetailsProps> = ({ ...flexProps }) => {
  const flexRef = React.useRef<HTMLDivElement>(null);

  return (
    <Flex
      ref={flexRef}
      bgColor={'teal.500'}
      py='16'
      {...flexProps}
    >
      <Container maxWidth={'8xl'}>
        <SimpleGrid
          columns={{ base: 1, md: 5 }}
          gap={{ base: '16', md: '4' }}
        >
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Heading fontWeight='semibold'>Why Confi?</Heading>
            <Text
              pt='4'
              color='fg.default'
              fontWeight='medium'
            >
              The name comes from the acronym ConFFI, which stands for Consultant of Funding &
              International Financing. It also refers to the English word Comfy (comfortable) -
              which reflects the type of experience we want to give you!
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Heading fontWeight='semibold'>Where does Confi come from?</Heading>
            <Text
              pt='4'
              color='fg.default'
              fontWeight='medium'
            >
              The idea of Confi is part of a final project for the MBA program at SEPT, an
              organization specialized in the study of small and medium enterprises at the
              University of Leipzig (Germany). The responsible person, Tassia Jansen, developed the
              tool with the intention of expanding access for social businesses to calls and
              international funding and financing opportunities.
            </Text>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, md: 1 }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <LinkOverlay
              href='https://www.linkedin.com/in/tassiajansen/'
              target='_blank'
            >
              <Box
                w='32'
                h='32'
              >
                <Avatar.Root
                  colorPalette='whiteAlpha'
                  variant='subtle'
                  size='full'
                >
                  <Avatar.Fallback name='Tássia Jansen' />
                  <Avatar.Image src='tassia.jpg' />
                  <Float
                    placement='bottom-end'
                    offsetX='3'
                    offsetY='3'
                  >
                    <Box
                      bgColor='#0e76a8'
                      borderRadius='full'
                      w='12'
                      h='12'
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Icon
                        size='xl'
                        color='white'
                      >
                        <FaLinkedinIn />
                      </Icon>
                    </Box>
                  </Float>
                </Avatar.Root>
              </Box>
            </LinkOverlay>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};
