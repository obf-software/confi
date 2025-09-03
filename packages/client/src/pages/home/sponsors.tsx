import {
  Container,
  Flex,
  FlexProps,
  For,
  Heading,
  Image,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

export interface SponsorsProps extends FlexProps {
  items: { name: string; logo: string }[];
}

export const Sponsors: React.FC<SponsorsProps> = ({ items, ...flexProps }) => {
  const flexRef = React.useRef<HTMLDivElement>(null);

  return (
    <Flex
      ref={flexRef}
      bgColor={'white'}
      py='16'
      {...flexProps}
    >
      <Container maxWidth={'8xl'}>
        <VStack>
          <Heading>Support</Heading>

          <SimpleGrid
            pt='4'
            columns={{ base: 1, sm: 2 }}
            gap='4'
          >
            <For each={items}>
              {(item, index) => (
                <Image
                  key={`${item.name}-${index.toString()}`}
                  src={item.logo}
                  alt={item.name}
                  maxH='36'
                  objectFit='contain'
                  objectPosition='center'
                  filter='grayscale(100%) brightness(100%) opacity(30%)'
                />
              )}
            </For>
          </SimpleGrid>
        </VStack>
      </Container>
    </Flex>
  );
};
