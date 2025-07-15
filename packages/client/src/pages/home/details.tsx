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
      bgColor={'brand.lightBlue'}
      py={16}
      {...flexProps}
    >
      <Container maxWidth={'8xl'}>
        <SimpleGrid
          columns={{ base: 1, md: 5 }}
          gap={{ base: 16, md: 4 }}
        >
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Heading fontWeight='semibold'>Por que Confi?</Heading>
            <Text
              pt='4'
              color='brand.grayText'
              fontWeight='medium'
            >
              O nome vem da sigla ConFFI, que significa Consultor de Funding & Financiamenti
              Internacional. Além disso também remete à palavra do inglês Comfy (confortável) - que
              reflete o tipo de experiencia que queremos dar pra você!
            </Text>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Heading fontWeight='semibold'>De onde vem o Confi?</Heading>
            <Text
              pt='4'
              color='brand.grayText'
              fontWeight='medium'
            >
              A ideia do Confi é parte de um trabalho de conclusão do programa de MBA do SEPT,
              organização especializada no estudo de pequenas e médias empresas na Universidade de
              Leipzig (Alemanha). A responsável, Tassia Jansen, desenvolveu a ferramenta com o
              intuito de ampliar o acesso de negócios sociais à editais e oportunidades de funding e
              financiamento internacionais.
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
