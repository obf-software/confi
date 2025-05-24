import {
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';

import { Field } from '../../components/field';
import { buildPath } from '../../helpers/build-path';
import { FormData } from './protocols';

export interface NameStepProps {
  onNext: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({ onNext }) => {
  const formMethods = useFormContext<FormData>();

  return (
    <Flex minH='100vh'>
      <Container
        maxW='8xl'
        py='16'
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          minH='100%'
        >
          <GridItem alignContent='center'>
            <VStack
              justify='space-between'
              minH={{ base: '90%', lg: '80%' }}
            >
              <VStack
                textAlign={{ base: 'center', lg: 'left' }}
                align={{ base: 'center', lg: 'flex-start' }}
                gap='6'
                width='100%'
              >
                <Heading
                  fontSize={{ base: '2xl', md: '5xl' }}
                  fontWeight='normal'
                  lineHeight='1'
                >
                  Vou te ajudar a encontrar oportunidades de <br />
                  <b>funding internacional</b>
                </Heading>

                <Text
                  fontSize={{ base: 'xl', md: '4xl' }}
                  fontWeight='normal'
                  lineHeight='1'
                >
                  para o seu negócio de impacto
                </Text>
              </VStack>

              <Image
                display={{ base: 'block', lg: 'none' }}
                my='4'
                src={buildPath('/ilustra-01.png')}
                aspectRatio={1}
                width='60%'
              />

              <VStack
                textAlign={{ base: 'center', lg: 'left' }}
                align={{ base: 'center', lg: 'flex-start' }}
                gap='6'
                width='100%'
              >
                <Text
                  fontSize={{ base: 'lg', md: '2xl' }}
                  fontWeight='normal'
                  lineHeight='1'
                >
                  Qual é o nome do seu negócio?
                </Text>

                <Stack
                  maxW='90%'
                  minW='85%'
                  gap='6'
                  direction={{ base: 'column', md: 'row' }}
                  align='center'
                >
                  <Field
                    required
                    invalid={!!formMethods.formState.errors.organizationName}
                    errorText={formMethods.formState.errors.organizationName?.message}
                  >
                    <Input
                      variant='subtle'
                      size='2xl'
                      {...formMethods.register('organizationName')}
                    />
                  </Field>

                  <Button
                    aria-label='Buscar'
                    rounded='full'
                    colorPalette='brandPrimaryButton'
                    color='white'
                    size='xl'
                    onClick={onNext}
                  >
                    Iniciar
                    <RiArrowRightLine />
                  </Button>
                </Stack>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem
            display={{ base: 'none', lg: 'block' }}
            alignContent='center'
          >
            <Image
              src={buildPath('/ilustra-01.png')}
              aspectRatio={1}
            />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Flex>
  );
};
