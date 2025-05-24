import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RiArrowLeftLine, RiSearchEyeLine } from 'react-icons/ri';

import { Field } from '../../components/field';
import { Select } from '../../components/select';
import {
  activityTimeCollection,
  businessStageCollection,
  englishLevelCollection,
  FormData,
  minorityGroupCollection,
  odsCollection,
  organizationTypeCollection,
} from './protocols';
export interface DiversityStep {
  onBack: () => void;
}

export const DiversityStep: React.FC<DiversityStep> = ({ onBack }) => {
  const formMethods = useFormContext<FormData>();

  return (
    <Flex minH='100vh'>
      <Container
        maxW='8xl'
        alignItems='center'
        display='flex'
        justifyContent='center'
        py='16'
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
            py='16'
          >
            <Field
              label={<>Região de Atuação</>}
              required
              invalid={!!formMethods.formState.errors.activityRegion}
              errorText={formMethods.formState.errors.activityRegion?.message}
            >
              <Input
                placeholder='Ex.: SP, RJ e PR (atualmente expandindo para o RS também)'
                variant='subtle'
                size='xl'
                {...formMethods.register('activityRegion')}
              />
            </Field>

            <Field
              label={<>Tipo de Organização</>}
              required
              invalid={!!formMethods.formState.errors.organizationType}
              errorText={formMethods.formState.errors.organizationType?.message}
            >
              <Controller
                control={formMethods.control}
                name='organizationType'
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={[field.value]}
                    onValueChange={(e) => {
                      const [value] = e.value;
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={organizationTypeCollection}
                  />
                )}
              />
            </Field>

            <Field
              label={<>Tempo de Atividade</>}
              required
              invalid={!!formMethods.formState.errors.activityTime}
              errorText={formMethods.formState.errors.activityTime?.message}
            >
              <Controller
                control={formMethods.control}
                name='activityTime'
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={[field.value]}
                    onValueChange={(e) => {
                      const [value] = e.value;
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={activityTimeCollection}
                  />
                )}
              />
            </Field>

            <Field
              label={<>Estágio do Negócio</>}
              required
              invalid={!!formMethods.formState.errors.businessStage}
              errorText={formMethods.formState.errors.businessStage?.message}
            >
              <Controller
                control={formMethods.control}
                name='businessStage'
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={[field.value]}
                    onValueChange={(e) => {
                      const [value] = e.value;
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={businessStageCollection}
                  />
                )}
              />
            </Field>

            <Field
              label={<>Principal Área de Impacto (de acordo com os ODS da ONU)</>}
              required
              invalid={!!formMethods.formState.errors.ods}
              errorText={formMethods.formState.errors.ods?.message}
            >
              <Controller
                control={formMethods.control}
                name='ods'
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={[field.value]}
                    onValueChange={(e) => {
                      const [value] = e.value;
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={odsCollection}
                  />
                )}
              />
            </Field>

            <Field
              label={<>Existem membros fundadores ou de C-level dentro das categorias a seguir?</>}
              invalid={!!formMethods.formState.errors.minorityGroups}
              errorText={formMethods.formState.errors.minorityGroups?.message}
            >
              <Controller
                control={formMethods.control}
                name='minorityGroups'
                render={({ field }) => (
                  <Select
                    multiple
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={minorityGroupCollection}
                  />
                )}
              />
            </Field>

            <Field
              label={
                <>
                  Existe alguém na sua equipe hoje capaz de lidar com os documentos do processo de
                  inscrição em inglês (e participar de eventos nesse idioma)?
                </>
              }
              required
              invalid={!!formMethods.formState.errors.englishLevel}
              errorText={formMethods.formState.errors.englishLevel?.message}
            >
              <Controller
                control={formMethods.control}
                name='englishLevel'
                render={({ field }) => (
                  <Select
                    name={field.name}
                    value={[field.value]}
                    onValueChange={(e) => {
                      const [value] = e.value;
                      field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                    onInteractOutside={field.onBlur}
                    collection={englishLevelCollection}
                  />
                )}
              />
            </Field>
          </SimpleGrid>

          <HStack
            gap='4'
            align='center'
            justify='center'
          >
            <IconButton
              aria-label='Voltar'
              rounded='full'
              colorPalette='black'
              size='xl'
              variant='outline'
              onClick={onBack}
            >
              <RiArrowLeftLine />
            </IconButton>

            <Button
              aria-label='Buscar'
              rounded='full'
              colorPalette='brandPrimaryButton'
              color='white'
              size='xl'
              type='submit'
              loading={formMethods.formState.isSubmitting}
            >
              Buscar Oportunidades
              <RiSearchEyeLine />
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Flex>
  );
};
