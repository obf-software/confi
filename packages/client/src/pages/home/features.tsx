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
            bg='teal.500'
            color='white'
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
      title: 'Advanced AI',
      description:
        'Intelligent algorithms that analyze thousands of opportunities and find the best options for your profile.',
    },
    {
      icon: <RiGlobalLine />,
      title: 'Global Reach',
      description:
        'Access to international opportunities in over 50 countries, connecting you to the world.',
    },
    {
      icon: <RiSearchEyeLine />,
      title: 'Smart Matching',
      description:
        'Advanced matching system that personalizes results based on your goals and experience.',
    },
    {
      icon: <RiFileDownloadLine />,
      title: 'Custom Reports',
      description:
        'Generate PDFs and calendars with your selected opportunities for efficient planning.',
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
        color='teal.300'
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
        color='teal.400'
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
        color='teal.200'
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
                background='linear-gradient(45deg, var(--colors-teal-500) 0%, var(--colors-teal-500) 100%)'
                backgroundClip='text'
                css={{
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                }}
              >
                Why choose Confi?
              </Heading>

              <Text
                fontSize='xl'
                color='fg.muted'
                maxW='2xl'
                lineHeight='1.6'
              >
                Discover the features that make Confi the best choice for finding international
                funding opportunities.
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
              bg='teal.500'
              color='white'
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
                  🚀 Ready to get started?
                </Heading>

                <Text
                  fontSize='lg'
                  opacity='0.9'
                >
                  Join hundreds of entrepreneurs who have already found their ideal opportunities
                  with Confi.
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
