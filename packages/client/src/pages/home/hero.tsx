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
import { RiArrowRightLine, RiRocketLine, RiSparklingFill, RiStarFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { ColorModeButton } from '../../components/color-mode';
import { useParallax, useScrollAnimation } from '../../hooks/use-scroll-animations';
import { routes } from '../../lib/routes';

export type HeroProps = FlexProps;

export const Hero: React.FC<HeroProps> = ({ ...flexProps }) => {
  const flexRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  // Parallax and scroll effects
  const parallaxY = useParallax(-0.3);
  const parallaxYSlow = useParallax(-0.1);
  const { scrollProgress } = useScrollAnimation();

  return (
    <Flex
      ref={flexRef}
      minH='90vh'
      bg='hero.bg'
      position='relative'
      {...flexProps}
    >
      {/* Color Mode Toggle - Top Right */}
      <Box
        position='absolute'
        top='4'
        right='4'
        zIndex='10'
      >
        <ColorModeButton />
      </Box>
      {/* Video Background with Loading State */}
      <Box
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='90vh'
        bg='hero.bg'
        opacity={isVideoLoaded ? 0 : 1}
        transition='opacity 0.5s ease-in-out'
      />

      <video
        playsInline
        autoPlay
        loop
        muted
        onLoadedData={() => {
          setIsVideoLoaded(true);
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '90vh',
          objectFit: 'cover',
          objectPosition: 'left',
          opacity: isVideoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <source
          src='robot.mp4'
          type={'video/mp4'}
        />
      </video>

      {/* Animated Overlay */}
      <Box
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='90vh'
        bg='hero.overlay'
        animation='pulse'
      />

      {/* Enhanced Floating Particles with Parallax */}
      <Box
        position='absolute'
        top='15%'
        right='8%'
        color='white'
        opacity='0.4'
        animation='float'
        transform={`translateY(${parallaxY * 0.5}px)`}
        transition='transform 0.1s ease-out'
      >
        <Icon fontSize='5xl'>
          <RiSparklingFill />
        </Icon>
      </Box>

      <Box
        position='absolute'
        top='55%'
        right='15%'
        color='white'
        opacity='0.3'
        animation='floatDelay'
        transform={`translateY(${parallaxY * 0.8}px)`}
        transition='transform 0.1s ease-out'
      >
        <Icon fontSize='4xl'>
          <RiRocketLine />
        </Icon>
      </Box>

      <Box
        position='absolute'
        top='25%'
        left='5%'
        color='brand.200'
        opacity='0.2'
        animation='floatSlow'
        transform={`translateY(${parallaxYSlow}px)`}
        transition='transform 0.1s ease-out'
      >
        <Icon fontSize='3xl'>
          <RiStarFill />
        </Icon>
      </Box>

      <Box
        position='absolute'
        top='75%'
        left='15%'
        color='brand.300'
        opacity='0.25'
        animation='floatFast'
        transform={`translateY(${parallaxY * 0.6}px) rotate(${scrollProgress * 360}deg)`}
        transition='transform 0.1s ease-out'
      >
        <Icon fontSize='2xl'>
          <RiSparklingFill />
        </Icon>
      </Box>

      <Box
        position='absolute'
        top='40%'
        right='25%'
        color='white'
        opacity='0.15'
        animation='floatLong'
        transform={`translateY(${parallaxYSlow * 1.2}px)`}
        transition='transform 0.1s ease-out'
      >
        <Icon fontSize='6xl'>
          <RiStarFill />
        </Icon>
      </Box>

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
          gap='16'
          animation='fadeInUp'
          position='relative'
          zIndex='2'
        >
          <Heading
            color='white'
            fontWeight='normal'
            fontSize={{ base: '6xl', md: '8xl' }}
            lineHeight='1'
            animation='fadeInUpDelay'
            background='linear-gradient(45deg, #FFFFFF 0%, #00C5CB 50%, #FFFFFF 100%)'
            backgroundSize='200% auto'
            backgroundClip='text'
            css={{
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
            }}
            _hover={{
              animation: 'shimmer',
            }}
            cursor='default'
          >
            Oi, eu sou o <br />
            <Box
              as='span'
              fontWeight='bold'
              color='#00C5CB'
            >
              Confi
            </Box>{' '}
            <Box
              as='span'
              animation='floatFast'
            >
              :{')'}
            </Box>
          </Heading>

          <VStack
            gap='2'
            alignItems='flex-start'
          >
            <Text
              color='white'
              fontWeight='normal'
              fontSize={{ base: 'xl', md: '2xl' }}
              animation='fadeInUpDelay4'
            >
              Seu Consultor de Funding Internacional.
            </Text>
            <Text
              color='rgba(255, 255, 255, 0.8)'
              fontSize={{ base: 'md', md: 'lg' }}
              animation='fadeInUpDelay6'
            >
              🚀 Transforme oportunidades em realidade com IA
            </Text>
          </VStack>

          <Box
            w='full'
            display='flex'
            flexDirection={{ base: 'column', md: 'row' }}
            gap='4'
            justifyContent={{
              base: 'center',
              md: 'flex-start',
            }}
            alignItems='center'
            animation='fadeInUpDelay8'
          >
            <Button
              colorPalette='teal'
              variant='solid'
              borderRadius='full'
              color='white'
              size='2xl'
              px='14'
              position='relative'
              overflow='hidden'
              transform='scale(1)'
              transition='all 0.3s ease'
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: '0 20px 40px rgba(0, 197, 203, 0.4)',
                '& > svg': {
                  transform: 'translateX(5px)',
                },
                _before: {
                  transform: 'translateX(100%)',
                },
              }}
              _before={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '-100%',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
              }}
              onClick={() => {
                void navigate(routes.auth.index);
              }}
            >
              🔥 Começar Agora{' '}
              <Icon transition='transform 0.3s ease'>
                <RiArrowRightLine />
              </Icon>
            </Button>

            <Button
              variant='outline'
              borderRadius='full'
              borderColor='white'
              borderWidth='2px'
              color='white'
              size='2xl'
              px='14'
              position='relative'
              overflow='hidden'
              transition='all 0.3s ease'
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: '#00C5CB',
                color: '#00C5CB',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => {
                void navigate(routes.auth.index);
              }}
            >
              ✨ Demo Gratuito
            </Button>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};
