import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Field } from '../../components/field';
import { toasterStore } from '../../components/toaster';
import { useAuth } from '../../contexts/auth-context';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      void navigate('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Não foi possível fazer login';
      toasterStore.create({
        id: 'login-error',
        title: 'Erro no login',
        description: errorMessage,
        closable: true,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      bg='gray.50'
    >
      <Container maxW='md'>
        <VStack gap='8'>
          <VStack gap='2'>
            <Heading
              fontSize='4xl'
              fontWeight='normal'
              textAlign='center'
            >
              Faça login no <b>Confi</b>
            </Heading>
            <Text
              color='gray.600'
              textAlign='center'
            >
              Entre na sua conta para acessar suas oportunidades
            </Text>
          </VStack>

          <Card.Root
            width='full'
            variant='elevated'
          >
            <Card.Body>
              <form
                onSubmit={(e) => {
                  void handleSubmit(onSubmit)(e);
                }}
              >
                <Stack gap='6'>
                  <Field
                    label='Email'
                    required
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                  >
                    <Input
                      type='email'
                      placeholder='seu@email.com'
                      {...register('email', {
                        required: 'Email é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido',
                        },
                      })}
                    />
                  </Field>

                  <Field
                    label='Senha'
                    required
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                  >
                    <Input
                      type='password'
                      placeholder='Digite sua senha'
                      {...register('password', {
                        required: 'Senha é obrigatória',
                        minLength: {
                          value: 8,
                          message: 'Senha deve ter pelo menos 8 caracteres',
                        },
                      })}
                    />
                  </Field>

                  <Button
                    type='submit'
                    colorPalette='brandPrimaryButton'
                    size='lg'
                    loading={isLoading}
                    w='full'
                  >
                    Entrar
                  </Button>
                </Stack>
              </form>
            </Card.Body>

            <Card.Footer>
              <Text textAlign='center'>
                Não tem uma conta?{' '}
                <RouterLink
                  to='/register'
                  style={{
                    color: 'var(--colors-brandPrimaryButton-500)',
                    fontWeight: '600',
                    textDecoration: 'none',
                  }}
                >
                  Criar conta
                </RouterLink>
              </Text>
            </Card.Footer>
          </Card.Root>

          <Box textAlign='center'>
            <RouterLink
              to='/'
              style={{
                color: 'var(--colors-gray-600)',
                textDecoration: 'none',
              }}
            >
              ← Voltar para página inicial
            </RouterLink>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};
