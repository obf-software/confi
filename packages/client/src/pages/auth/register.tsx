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

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ConfirmationFormData {
  code: string;
}

export const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'register' | 'confirm'>('register');
  const [email, setEmail] = useState('');
  const { register: registerUser, confirmRegistration } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const {
    register: registerConfirm,
    handleSubmit: handleSubmitConfirm,
    formState: { errors: confirmErrors },
  } = useForm<ConfirmationFormData>();

  const password = watch('password');

  const onSubmitRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password, data.name);
      setEmail(data.email);
      setStep('confirm');
      toasterStore.create({
        id: 'register-success',
        title: 'Conta criada com sucesso',
        description: 'Verifique seu email para confirmar a conta',
        closable: true,
        type: 'success',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Não foi possível criar a conta';
      toasterStore.create({
        id: 'register-error',
        title: 'Erro no cadastro',
        description: errorMessage,
        closable: true,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitConfirm = async (data: ConfirmationFormData) => {
    setIsLoading(true);
    try {
      await confirmRegistration(email, data.code);
      toasterStore.create({
        id: 'confirm-success',
        title: 'Conta confirmada',
        description: 'Você pode fazer login agora',
        closable: true,
        type: 'success',
      });
      void navigate('/login');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Código inválido';
      toasterStore.create({
        id: 'confirm-error',
        title: 'Erro na confirmação',
        description: errorMessage,
        closable: true,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'confirm') {
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
                Confirme sua conta
              </Heading>
              <Text
                color='gray.600'
                textAlign='center'
              >
                Enviamos um código de confirmação para {email}
              </Text>
            </VStack>

            <Card.Root
              width='full'
              variant='elevated'
            >
              <Card.Body>
                <form
                  onSubmit={(e) => {
                    void handleSubmitConfirm(onSubmitConfirm)(e);
                  }}
                >
                  <Stack gap='6'>
                    <Field
                      label='Código de confirmação'
                      required
                      invalid={!!confirmErrors.code}
                      errorText={confirmErrors.code?.message}
                    >
                      <Input
                        placeholder='Digite o código recebido'
                        {...registerConfirm('code', {
                          required: 'Código é obrigatório',
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
                      Confirmar conta
                    </Button>
                  </Stack>
                </form>
              </Card.Body>
            </Card.Root>

            <Box textAlign='center'>
              <RouterLink
                to='/login'
                style={{
                  color: 'var(--colors-gray-600)',
                  textDecoration: 'none',
                }}
              >
                ← Voltar para login
              </RouterLink>
            </Box>
          </VStack>
        </Container>
      </Flex>
    );
  }

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
              Criar conta no <b>Confi</b>
            </Heading>
            <Text
              color='gray.600'
              textAlign='center'
            >
              Crie sua conta para acessar oportunidades personalizadas
            </Text>
          </VStack>

          <Card.Root
            width='full'
            variant='elevated'
          >
            <Card.Body>
              <form
                onSubmit={(e) => {
                  void handleSubmit(onSubmitRegister)(e);
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
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            'Senha deve conter ao menos uma letra maiúscula, minúscula e um número',
                        },
                      })}
                    />
                  </Field>

                  <Field
                    label='Confirmar senha'
                    required
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                  >
                    <Input
                      type='password'
                      placeholder='Confirme sua senha'
                      {...register('confirmPassword', {
                        required: 'Confirmação de senha é obrigatória',
                        validate: (value) => value === password || 'Senhas não coincidem',
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
                    Criar conta
                  </Button>
                </Stack>
              </form>
            </Card.Body>

            <Card.Footer>
              <Text textAlign='center'>
                Já tem uma conta?{' '}
                <RouterLink
                  to='/login'
                  style={{
                    color: 'var(--colors-brandPrimaryButton-500)',
                    fontWeight: '600',
                    textDecoration: 'none',
                  }}
                >
                  Fazer login
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
