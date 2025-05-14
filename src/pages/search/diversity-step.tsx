import {
  Button,
  Container,
  createListCollection,
  Field,
  Flex,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import { Select } from '../../components/select';
export interface DiversityStep {
  onBack: () => void;
  onSubmit: () => void;
}

export const DiversityStep: React.FC<DiversityStep> = ({ onBack, onSubmit }) => {
  const organizationTypeCollection = createListCollection({
    items: [
      { value: 'Informal (sem CNPJ)' },
      { value: 'Negócio' },
      { value: 'ONG / OSCIP (Associação ou Fundação)' },
      { value: 'Cooperativa' },
    ],
  });

  const activityTimeCollection = createListCollection({
    items: [
      { value: 'Menos de 1 ano' },
      { value: 'Entre 1 e 3 anos' },
      { value: 'Entre 3 e 5 anos' },
      { value: 'Mais de 5 anos' },
    ],
  });

  const businessStageCollection = createListCollection({
    items: [
      {
        value: 'Ideação',
      },
      { value: 'Validação' },
      { value: 'Tração' },
      { value: 'Escala' },
    ],
  });

  const odsCollection = createListCollection({
    items: [
      { value: 'Pobreza - ODS 1' },
      { value: 'Fome - ODS 2' },
      { value: 'Saúde - ODS 3' },
      { value: 'Educação - ODS 4' },
      { value: 'Gênero - ODS 5' },
      { value: 'Água - ODS 6' },
      { value: 'Energia - ODS 7' },
      { value: 'Trabalho - ODS 8' },
      { value: 'Inovação - ODS 9' },
      { value: 'Desigualdade - ODS 10' },
      { value: 'Cidades - ODS 11' },
      { value: 'Consumo - ODS 12' },
      { value: 'Clima - ODS 13' },
      { value: 'Vida Marinha - ODS 14' },
      { value: 'Vida Terrestre - ODS 15' },
      { value: 'Paz - ODS 16' },
      { value: 'Parcerias - ODS 17' },
    ],
  });

  const minorityGroupCollection = createListCollection({
    items: [
      { value: 'Mulheres' },
      { value: 'População Indígena' },
      { value: 'Jovem (15-29 anos)' },
      { value: 'LGBTQIA+' },
      { value: 'Pretos/Pardos' },
      { value: 'Cidadão da União Europeia' },
    ],
  });

  const englishLevelCollection = createListCollection({
    items: [
      { value: 'Sim, com nível intermediário de inglês' },
      { value: 'Sim, com nível avançado de inglês' },
      { value: 'Ainda não' },
    ],
  });

  return (
    <Flex minH='100vh'>
      <Container
        maxW='8xl'
        alignItems='center'
        display='flex'
        justifyContent='center'
      >
        <VStack
          align='center'
          justify='space-between'
          minH={{ base: '90%', lg: '80%' }}
        >
          <Heading
            textAlign='center'
            fontSize={{ base: '2xl', md: '5xl' }}
            fontWeight='normal'
            lineHeight='1'
          >
            Algumas perguntinhas importantes para fazermos o match correto de oportunidades pra
            vocês
          </Heading>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            minW='100%'
            gap='4'
          >
            <GridItem>
              <VStack gap='6'>
                <Field.Root required>
                  <Field.Label>
                    Região de Atuação <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder='Ex.: SP, RJ e PR (atualmente expandindo para o RS também)'
                    variant='subtle'
                    size='xl'
                  />
                </Field.Root>

                <Field.Root required>
                  <Select
                    collection={organizationTypeCollection}
                    label={
                      <>
                        Tipo de Organização <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Select
                    collection={activityTimeCollection}
                    label={
                      <>
                        Tempo de Atividade <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Select
                    collection={businessStageCollection}
                    label={
                      <>
                        Estágio do Negócio <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack gap='6'>
                <Field.Root required>
                  <Select
                    collection={odsCollection}
                    label={
                      <>
                        Principal Área de Impacto (de acordo com os ODS da ONU){' '}
                        <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Select
                    collection={minorityGroupCollection}
                    multiple
                    label={
                      <>
                        Existem membros fundadores ou de C-level dentro das categorias a seguir?{' '}
                        <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>

                <Field.Root required>
                  <Select
                    collection={englishLevelCollection}
                    label={
                      <>
                        Existe alguém na sua equipe hoje capaz de lidar com os documentos do
                        processo de inscrição em inglês (e participar de eventos nesse idioma)?{' '}
                        <Field.RequiredIndicator />
                      </>
                    }
                  />
                </Field.Root>
              </VStack>
            </GridItem>
          </SimpleGrid>

          <Stack
            gap='6'
            direction={{ base: 'column', md: 'row' }}
            align='center'
            justify='center'
            w='100%'
          >
            <Button
              aria-label='Voltar'
              rounded='full'
              colorPalette='black'
              size='xl'
              variant='outline'
              onClick={onBack}
            >
              <RiArrowLeftLine />
              Anterior
            </Button>

            <Button
              aria-label='Buscar'
              rounded='full'
              colorPalette='brandPrimaryButton'
              color='white'
              size='xl'
              onClick={onSubmit}
            >
              Buscar Oportunidades
              <RiArrowRightLine />
            </Button>
          </Stack>
        </VStack>
      </Container>
    </Flex>
  );
};
