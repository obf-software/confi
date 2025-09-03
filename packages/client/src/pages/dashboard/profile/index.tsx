import { Button, Card, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Field } from '../../../components/field';
import { useAuth } from '../../../hooks/use-auth';
import { useToaster } from '../../../contexts/toaster';

interface ProfileFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  position?: string;
}

export const DashboardProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const toaster = useToaster();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.signInDetails?.loginId || '',
      email: user?.username || '',
      phone: '',
      organization: '',
      position: '',
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
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso',
        closable: true,
        type: 'success',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Não foi possível atualizar as informações';
      toaster.create({
        id: 'profile-error',
        title: 'Erro ao atualizar perfil',
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
      <VStack
        align='flex-start'
        gap='2'
      >
        <Heading
          as='h1'
          fontSize='4xl'
          lineHeight='1'
          fontWeight='normal'
        >
          Meu <b>Perfil</b>
        </Heading>
        <Text
          fontSize='lg'
          color='gray.600'
        >
          Atualize suas informações pessoais e de contato
        </Text>
      </VStack>

      <Card.Root
        width='full'
        variant='elevated'
      >
        <Card.Header>
          <Heading size='lg'>Informações Pessoais</Heading>
        </Card.Header>

        <Card.Body>
          <form
            onSubmit={(e) => {
              void handleSubmit(onSubmit)(e);
            }}
          >
            <Stack gap='6'>
              <Field
                label='Nome completo'
                required
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input
                  placeholder='Seu nome completo'
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres',
                    },
                  })}
                />
              </Field>

              <Field
                label='Email'
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  type='email'
                  placeholder='seu@email.com'
                  disabled
                  {...register('email', {
                    required: 'Email é obrigatório',
                  })}
                />
                <Text
                  fontSize='sm'
                  color='gray.500'
                  mt='1'
                >
                  O email não pode ser alterado
                </Text>
              </Field>

              <Field
                label='Telefone'
                invalid={!!errors.phone}
                errorText={errors.phone?.message}
              >
                <Input
                  type='tel'
                  placeholder='(11) 99999-9999'
                  {...register('phone', {
                    pattern: {
                      value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                      message: 'Formato inválido. Use (11) 99999-9999',
                    },
                  })}
                />
              </Field>

              <Field
                label='Organização'
                invalid={!!errors.organization}
                errorText={errors.organization?.message}
              >
                <Input
                  placeholder='Nome da sua organização'
                  {...register('organization')}
                />
              </Field>

              <Field
                label='Cargo'
                invalid={!!errors.position}
                errorText={errors.position?.message}
              >
                <Input
                  placeholder='Seu cargo na organização'
                  {...register('position')}
                />
              </Field>

              <Button
                type='submit'
                colorPalette='brandPrimaryButton'
                size='lg'
                loading={isLoading}
                alignSelf='flex-start'
              >
                Salvar alterações
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
