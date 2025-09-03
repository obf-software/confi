import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiDoubleQuotesL, RiStarFill } from 'react-icons/ri';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  delay?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  avatar,
  rating,
  delay = '0s',
}) => {
  return (
    <Box
      bg='white'
      borderRadius='2xl'
      overflow='hidden'
      position='relative'
      transition='all 0.3s ease'
      animation='fadeInUp'
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box p='8'>
        <VStack
          alignItems='flex-start'
          gap='6'
        >
          {/* Quote Icon */}
          <Box
            color='#00C5CB'
            opacity='0.3'
            animation='float'
          >
            <Icon fontSize='3xl'>
              <RiDoubleQuotesL />
            </Icon>
          </Box>

          {/* Rating */}
          <HStack gap='1'>
            {Array.from({ length: rating }).map((_, i) => (
              <Icon
                key={i}
                color='#FFD700'
                fontSize='lg'
              >
                <RiStarFill />
              </Icon>
            ))}
          </HStack>

          {/* Quote */}
          <Text
            fontSize='md'
            lineHeight='1.7'
            color='#2D3748'
            fontStyle='italic'
          >
            "{quote}"
          </Text>

          {/* Author Info */}
          <HStack
            gap='4'
            w='full'
          >
            <Avatar.Root
              size='lg'
              bg='linear-gradient(135deg, #00C5CB 0%, #0A274E 100%)'
            >
              <Avatar.Fallback name={author} />
              <Avatar.Image src={avatar} />
            </Avatar.Root>

            <VStack
              alignItems='flex-start'
              gap='1'
              flex='1'
            >
              <Text
                fontWeight='bold'
                color='#0A274E'
                fontSize='md'
              >
                {author}
              </Text>
              <Text
                fontSize='sm'
                color='fg.default'
              >
                {role}
              </Text>
              <Text
                fontSize='sm'
                color='#00C5CB'
                fontWeight='medium'
              >
                {company}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Confi completely transformed my search for funding. In 2 weeks I found 3 perfect opportunities for my social technology startup.',
      author: 'Maria Silva',
      role: 'CEO & Fundadora',
      company: 'EcoTech Solutions',
      avatar: '/avatars/maria.jpg',
      rating: 5,
    },
    {
      quote:
        "Confi's AI is impressive! It managed to identify opportunities I would never have found alone. Today my company operates in 4 countries.",
      author: 'João Santos',
      role: 'Diretor de Inovação',
      company: 'GreenEnergy Brasil',
      avatar: '/avatars/joao.jpg',
      rating: 5,
    },
    {
      quote:
        'Intuitive interface and precise results. Confi helped me get a scholarship in Germany that completely changed my career.',
      author: 'Ana Costa',
      role: 'Pesquisadora',
      company: 'Instituto de Bioenergia',
      avatar: '/avatars/ana.jpg',
      rating: 5,
    },
  ];

  return (
    <Box
      position='relative'
      py='24'
      overflow='hidden'
    >
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
              What our users say
            </Heading>

            <Text
              fontSize='xl'
              color='fg.default'
              maxW='2xl'
              lineHeight='1.6'
            >
              Discover how Confi has helped entrepreneurs and researchers find their ideal
              opportunities.
            </Text>
          </VStack>

          {/* Testimonials Grid */}
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            gap='8'
            w='full'
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                {...testimonial}
                delay={`${(index * 0.2).toString()}s`}
              />
            ))}
          </SimpleGrid>

          {/* Stats Section */}
          <Box
            w='full'
            p='12'
            borderRadius='2xl'
            bg='linear-gradient(135deg, #F7FAFC 0%, #E2E8F0 100%)'
            animation='fadeInUpDelayLong'
          >
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='8'
            >
              <VStack gap='2'>
                <Text
                  fontSize='4xl'
                  fontWeight='bold'
                  color='#00C5CB'
                  animation='floatStats'
                >
                  100+
                </Text>
                <Text
                  color='#0A274E'
                  fontWeight='medium'
                >
                  Active Users
                </Text>
                <Text
                  fontSize='sm'
                  color='fg.default'
                  textAlign='center'
                >
                  Entrepreneurs and researchers trusting Confi
                </Text>
              </VStack>

              <VStack gap='2'>
                <Text
                  fontSize='4xl'
                  fontWeight='bold'
                  color='#00C5CB'
                  animation='floatStats2'
                >
                  95%
                </Text>
                <Text
                  color='#0A274E'
                  fontWeight='medium'
                >
                  Success Rate
                </Text>
                <Text
                  fontSize='sm'
                  color='fg.default'
                  textAlign='center'
                >
                  Of users find relevant opportunities
                </Text>
              </VStack>

              <VStack gap='2'>
                <Text
                  fontSize='4xl'
                  fontWeight='bold'
                  color='#00C5CB'
                  animation='floatStats3'
                >
                  50+
                </Text>
                <Text
                  color='#0A274E'
                  fontWeight='medium'
                >
                  Countries Served
                </Text>
                <Text
                  fontSize='sm'
                  color='fg.default'
                  textAlign='center'
                >
                  Global opportunities within your reach
                </Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
