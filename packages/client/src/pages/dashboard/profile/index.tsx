import { Box, Button, Card, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Field } from '../../../components/field';
import { useToaster } from '../../../contexts/toaster';
import { useCurrentUser } from '../../../hooks/use-current-user';

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  position?: string;
}

export const DashboardProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useCurrentUser();
  const toaster = useToaster();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: currentUser.data?.name || '',
      email: currentUser.data?.email || '',
      phone: currentUser.data?.phone || '',
      organization: currentUser.data?.organization || '',
      position: currentUser.data?.position || '',
    },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to update the user profile
      // For now, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toaster.create({
        id: 'profile-success',
        title: 'Profile updated',
        description: 'Your information has been successfully updated',
        closable: true,
        type: 'success',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to update information';
      toaster.create({
        id: 'profile-error',
        title: 'Error updating profile',
        description: errorMessage,
        closable: true,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack
      align='flex-start'
      gap='6'
      maxW='2xl'
    >
      <Box>
        <Heading
          size='2xl'
          color='fg.emphasized'
          mb='2'
        >
          My Profile
        </Heading>
        <Text color='fg.muted'>View and manage your personal information</Text>
      </Box>

      <Card.Root
        width='full'
        variant='elevated'
      >
        <Card.Header>
          <Heading size='lg'>Personal Information</Heading>
        </Card.Header>

        <Card.Body>
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
          >
            <Stack gap='6'>
              <Field
                label='Full name'
                required
                disabled
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input
                  colorPalette={'teal'}
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must have at least 2 characters',
                    },
                  })}
                />
              </Field>

              <Field
                label='Email'
                required
                disabled
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  type='email'
                  colorPalette={'teal'}
                  {...register('email', {
                    required: 'Email is required',
                  })}
                />
                <Text
                  fontSize='sm'
                  colorPalette={'gray'}
                  mt='1'
                >
                  Email cannot be changed
                </Text>
              </Field>

              <Field
                label='Telefone'
                disabled
                invalid={!!errors.phone}
                errorText={errors.phone?.message}
              >
                <Input
                  type='tel'
                  colorPalette={'teal'}
                  {...register('phone', {
                    pattern: {
                      value: /^\+?[\d\s()-]+$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
              </Field>

              <Field
                label='Organization'
                disabled
                invalid={!!errors.organization}
                errorText={errors.organization?.message}
              >
                <Input
                  colorPalette={'teal'}
                  {...register('organization')}
                />
              </Field>

              <Field
                label='Position'
                disabled
                invalid={!!errors.position}
                errorText={errors.position?.message}
              >
                <Input
                  colorPalette={'teal'}
                  {...register('position')}
                />
              </Field>

              <Button
                type='submit'
                colorPalette='teal'
                size='lg'
                loading={isLoading}
                disabled
                alignSelf='flex-start'
              >
                Save changes
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
