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


interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = '0s' }) => {
  return (
    <Box
      bg='white'
      borderRadius='2xl'
      overflow='hidden'
      transition='all 0.3s ease'
      animation='fadeInUp'
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      _hover={{
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(0, 197, 203, 0.15)',
      }}
    >
      <Box p='8'>
        <VStack
          alignItems='center'
          textAlign='center'
          gap='6'
        >
          <Box
            p='4'
            borderRadius='full'
            bg='linear-gradient(135deg, #00C5CB 0%, #0A274E 100%)'
            color='white'
            animation='float'
          >
            <Icon fontSize='3xl'>{icon}</Icon>
          </Box>

          <VStack gap='3'>
            <Heading
              size='lg'
              color='#0A274E'
              fontWeight='bold'
            >
              {title}
            </Heading>

            <Text
              color='brand.grayText'
              fontSize='md'
              lineHeight='1.6'
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
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
      bg='linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 100%)'
      overflow='hidden'
    >
      {/* Background Elements */}
      <Box
        position='absolute'
        top='10%'
        left='5%'
        color='#00C5CB'
        opacity='0.1'
        animation='floatSlow'
        display={{ base: 'none', lg: 'block' }}
      >
        <Icon fontSize='8xl'>
          <RiSparklingFill />
        </Icon>
      </Box>

      <Box
        position='absolute'
        bottom='10%'
        right='5%'
        color='#0A274E'
        opacity='0.1'
        animation='floatDelay'
        display={{ base: 'none', lg: 'block' }}
      >
        <Icon fontSize='6xl'>
          <RiRocketLine />
        </Icon>
      </Box>

      <Container maxW='8xl'>
        <VStack
          gap='16'
          textAlign='center'
        >
          {/* Header */}
          <VStack
            gap='6'
            animation='fadeInUp'
          >
            <Heading
              size='3xl'
              color='#0A274E'
              fontWeight='bold'
              background='linear-gradient(45deg, #0A274E 0%, #00C5CB 100%)'
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
              color='brand.grayText'
              maxW='2xl'
              lineHeight='1.6'
            >
              Descubra as funcionalidades que tornam o Confi a melhor escolha para encontrar
              oportunidades de funding internacional.
            </Text>
          </VStack>

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
          <VStack
            gap='6'
            mt='8'
            animation='fadeInUpDelayLong'
          >
            <Box
              p='8'
              borderRadius='2xl'
              bg='linear-gradient(135deg, #00C5CB 0%, #0A274E 100%)'
              color='white'
              textAlign='center'
              position='relative'
              overflow='hidden'
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

              {/* Background Animation */}
              <Box
                position='absolute'
                top='-50%'
                right='-10%'
                width='60%'
                height='200%'
                opacity='0.1'
                background='radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                animation='floatLong'
              />
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};
