import {
  Box,
  Button,
  Container,
  Flex,
  FlexProps,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


export type HeroProps = FlexProps;

export const Hero: React.FC<HeroProps> = ({ ...flexProps }) => {
  const flexRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Flex
      ref={flexRef}
      minH='90vh'
      bgColor='#0A274E'
      {...flexProps}
    >
      <video
        playsInline
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '90vh',
          objectFit: 'cover',
          objectPosition: 'left',
        }}
      >
        <source
          src='robot.mp4'
          type={'video/mp4'}
        />
      </video>

      <Container
        maxWidth='8xl'
        py='16'
        display='flex'
        alignItems='center'
        justifyContent={{
          base: 'center',
          md: 'flex-start',
        }}
      >
        <VStack
          alignItems='flex-start'
          gap={16}
        >
          <Heading
            color='white'
            fontWeight='normal'
            fontSize={{ base: '6xl', md: '8xl' }}
            lineHeight='1'
          >
            Oi, eu sou o <br />
            <b>Confi</b> :{')'}
          </Heading>

          <Text
            color='white'
            fontWeight='normal'
            fontSize={{ base: 'xl', md: '2xl' }}
          >
            Seu Consultor de Funding Internacional.
          </Text>

          <Box
            w='full'
            display='flex'
            justifyContent={{
              base: 'center',
              md: 'flex-start',
            }}
          >
            <Button
              colorPalette='brandPrimaryButton'
              variant='solid'
              borderRadius='full'
              color='white'
              size='2xl'
              px='14'
              _hover={{
                '& > svg': {
                  display: 'block',
                },
              }}
              onClick={() => {
                void navigate('/search');
              }}
            >
              Buscar Oportunidades{' '}
              <Icon display='none'>
                <RiArrowRightLine />
              </Icon>
            </Button>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};
