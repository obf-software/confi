import { Box, Container, Heading, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAiGenerate,
  RiFileDownloadLine,
  RiGlobalLine,
  RiRocketLine,
  RiSearchEyeLine,
  RiSparklingFill,
} from 'react-icons/ri';

import { AnimatedSection, GlassCard, ParallaxBox } from '../../components/animated-section';

interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = '0s' }) => {
  return (
    <AnimatedSection
      animation='slideInUp'
      delay={parseInt(delay) || 0}
      threshold={0.1}
    >
      <GlassCard
        intensity='medium'
        transition='all 0.3s ease'
        _hover={{
          transform: 'translateY(-10px) scale(1.02)',
          boxShadow: 'glass.shadow, 0 20px 40px rgba(0, 197, 203, 0.15)',
        }}
        cursor='pointer'
      >
        <VStack
          alignItems='center'
          textAlign='center'
          gap='6'
        >
          <Box
            p='4'
            borderRadius='full'
            bg='brandPrimaryButton.solid'
            color='brandPrimaryButton.contrast'
            animation='float'
            boxShadow='0 8px 25px rgba(0, 197, 203, 0.3)'
          >
            <Icon fontSize='3xl'>{icon}</Icon>
          </Box>

          <VStack gap='3'>
            <Heading
              size='lg'
              color='fg.default'
              fontWeight='bold'
            >
              {title}
            </Heading>

            <Text
              color='fg.muted'
              fontSize='md'
              lineHeight='1.6'
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </GlassCard>
    </AnimatedSection>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <RiAiGenerate />,
      title: 'IA Avançada',
      description:
        'Algoritmos inteligentes que analisam milhares de oportunidades e encontram as melhores opções para seu perfil.',
    },
    {
      icon: <RiGlobalLine />,
      title: 'Alcance Global',
      description:
        'Acesso a oportunidades internacionais em mais de 50 países, conectando você ao mundo.',
    },
    {
      icon: <RiSearchEyeLine />,
      title: 'Busca Inteligente',
      description:
        'Sistema de filtros avançados que personaliza os resultados com base em seus objetivos e experiência.',
    },
    {
      icon: <RiFileDownloadLine />,
      title: 'Relatórios Personalizados',
      description:
        'Gere PDFs e calendários com suas oportunidades selecionadas para um planejamento eficiente.',
    },
  ];

  return (
    <Box
      position='relative'
      py='24'
      bg='bg.surface'
      overflow='hidden'
    >
      {/* Background Elements with Parallax */}
      <ParallaxBox
        speed={-0.2}
        position='absolute'
        top='10%'
        left='5%'
        color='brandPrimaryButton.300'
        opacity='0.15'
        animation='floatSlow'
        display={{ base: 'none', lg: 'block' }}
      >
        <Icon fontSize='8xl'>
          <RiSparklingFill />
        </Icon>
      </ParallaxBox>

      <ParallaxBox
        speed={-0.3}
        position='absolute'
        bottom='10%'
        right='5%'
        color='brandPrimaryButton.400'
        opacity='0.12'
        animation='floatDelay'
        display={{ base: 'none', lg: 'block' }}
      >
        <Icon fontSize='6xl'>
          <RiRocketLine />
        </Icon>
      </ParallaxBox>

      <ParallaxBox
        speed={-0.1}
        position='absolute'
        top='30%'
        right='15%'
        color='brandPrimaryButton.200'
        opacity='0.08'
        animation='floatLong'
        display={{ base: 'none', lg: 'block' }}
      >
        <Icon fontSize='5xl'>
          <RiSparklingFill />
        </Icon>
      </ParallaxBox>

      <Container maxW='8xl'>
        <VStack
          gap='16'
          textAlign='center'
        >
          {/* Header */}
          <AnimatedSection
            animation='fadeInUp'
            threshold={0.3}
          >
            <VStack gap='6'>
              <Heading
                size='3xl'
                color='fg.default'
                fontWeight='bold'
                background='linear-gradient(45deg, var(--colors-brandPrimaryButton-fg) 0%, var(--colors-brandPrimaryButton-solid) 100%)'
                backgroundClip='text'
                css={{
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                }}
              >
                Por que escolher o Confi?
              </Heading>

              <Text
                fontSize='xl'
                color='fg.muted'
                maxW='2xl'
                lineHeight='1.6'
              >
                Descubra as funcionalidades que tornam o Confi a melhor escolha para encontrar
                oportunidades de funding internacional.
              </Text>
            </VStack>
          </AnimatedSection>

          {/* Features Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap='8'
            w='full'
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={`${(index * 0.2).toString()}s`}
              />
            ))}
          </SimpleGrid>

          {/* CTA Section */}
          <AnimatedSection
            animation='scaleIn'
            threshold={0.2}
          >
            <Box
              p='8'
              borderRadius='2xl'
              bg='brandPrimaryButton.solid'
              color='brandPrimaryButton.contrast'
              textAlign='center'
              position='relative'
              overflow='hidden'
              boxShadow='0 20px 50px rgba(0, 197, 203, 0.25)'
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 25px 60px rgba(0, 197, 203, 0.35)',
              }}
              transition='all 0.3s ease'
            >
              <VStack gap='4'>
                <Heading
                  size='xl'
                  fontWeight='bold'
                >
                  🚀 Pronto para começar?
                </Heading>

                <Text
                  fontSize='lg'
                  opacity='0.9'
                >
                  Junte-se a centenas de empreendedores que já encontraram suas oportunidades ideais
                  com o Confi.
                </Text>
              </VStack>

              {/* Enhanced Background Animation */}
              <Box
                position='absolute'
                top='-50%'
                right='-10%'
                width='60%'
                height='200%'
                opacity='0.15'
                background='radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
                animation='floatLong'
              />

              <Box
                position='absolute'
                top='-30%'
                left='-5%'
                width='40%'
                height='160%'
                opacity='0.1'
                background='radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)'
                animation='floatDelay'
              />
            </Box>
          </AnimatedSection>
        </VStack>
      </Container>
    </Box>
  );
};
