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

import { Field } from '../../../components/field';
import { Select } from '../../../components/select';
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
    <Flex minH='90vh'>
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
            Some important questions to make the right match of opportunities for you
          </Heading>

          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            minW='100%'
            gap='4'
            py='16'
          >
            <Field
              label={<>Region of Activity</>}
              required
              invalid={!!formMethods.formState.errors.activityRegion}
              errorText={formMethods.formState.errors.activityRegion?.message}
            >
              <Input
                placeholder='Ex.: SP, RJ and PR (currently expanding to RS as well)'
                variant='outline'
                size='xl'
                {...formMethods.register('activityRegion')}
              />
            </Field>

            <Field
              label={<>Organization Type</>}
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
              label={<>Activity Time</>}
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
              label={<>Business Stage</>}
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
              label={<>Main Impact Area (according to UN SDGs)</>}
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
              label={<>Are there founding or C-level members within the following categories?</>}
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
                  Is there someone on your team today capable of handling the application process
                  documents in English (and participating in events in that language)?
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
              aria-label='Back'
              rounded='full'
              colorPalette='black'
              size='xl'
              variant='outline'
              onClick={onBack}
            >
              <RiArrowLeftLine />
            </IconButton>

            <Button
              aria-label='Search'
              rounded='full'
              colorPalette='teal'
              size='xl'
              type='submit'
              loading={formMethods.formState.isSubmitting}
            >
              Search Opportunities
              <RiSearchEyeLine />
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Flex>
  );
};
