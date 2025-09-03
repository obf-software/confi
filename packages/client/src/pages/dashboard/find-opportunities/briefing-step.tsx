import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import { Field } from '../../../components/field';
import { FormData } from './protocols';

export interface BriefingStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const BriefingStep: React.FC<BriefingStepProps> = ({ onBack, onNext }) => {
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
          align={{ base: 'center', lg: 'flex-start' }}
          justify='space-between'
          minH={{ base: '90%', lg: '80%' }}
        >
          <Heading
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: 'xl', md: '4xl' }}
            fontWeight='normal'
            lineHeight='1'
            width='70%'
          >
            Now tell me:
          </Heading>

          <Heading
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: '2xl', md: '5xl' }}
            fontWeight='bold'
            lineHeight='1'
            width='70%'
          >
            What do you do?
          </Heading>

          <Text
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight='light'
            lineHeight='1'
            width='85%'
          >
            you can explain briefly, in a sentence like "we give SP peripheries access to quality
            education through accessible courses" - but remember: the more information, the better
            the match!
          </Text>

          <VStack
            align={{ base: 'center', lg: 'flex-start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            gap='6'
            width='100%'
          >
            <Text
              fontSize={{ base: 'lg', md: '2xl' }}
              fontWeight='normal'
              lineHeight='1'
            >
              👇
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
                invalid={!!formMethods.formState.errors.organizationBriefing}
                errorText={formMethods.formState.errors.organizationBriefing?.message}
              >
                <Textarea
                  variant='outline'
                  colorPalette='teal'
                  size='xl'
                  height='32'
                  resize='none'
                  {...formMethods.register('organizationBriefing')}
                />
              </Field>

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
                  onClick={onNext}
                >
                  Next
                  <RiArrowRightLine />
                </Button>
              </HStack>
            </Stack>
          </VStack>
        </VStack>
      </Container>
    </Flex>
  );
};
