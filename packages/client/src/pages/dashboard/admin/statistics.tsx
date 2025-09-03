import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  Stat,
  HStack,
  Badge,
  Alert,
} from '@chakra-ui/react';
import { FiSearch, FiTag, FiCheckCircle, FiUsers, FiFileText } from 'react-icons/fi';
import { MdOutlineAutoAwesome } from 'react-icons/md';

export const DashboardAdminStatistics: React.FC = () => {
  return (
    <Box>
      <VStack
        align='stretch'
        gap='6'
      >
        <Box>
          <Heading
            size='2xl'
            color='fg.emphasized'
            mb='2'
          >
            Estatísticas
          </Heading>
          <Text color='fg.muted'>Visão geral do sistema e guia de administração</Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap='6'
        >
          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Total de Oportunidades</Stat.Label>
                <Stat.ValueText>124</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  23% desde o último mês
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Planejamentos Criados</Stat.Label>
                <Stat.ValueText>45</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  12% desde o último mês
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Usuários Ativos</Stat.Label>
                <Stat.ValueText>28</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />8 novos esta semana
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Tags Criadas</Stat.Label>
                <Stat.ValueText>67</Stat.ValueText>
                <Stat.HelpText>Categorizando oportunidades</Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Buscas Realizadas</Stat.Label>
                <Stat.ValueText>312</Stat.ValueText>
                <Stat.HelpText>
                  <Stat.UpIndicator />
                  18% desde o último mês
                </Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Body>
              <Stat.Root>
                <Stat.Label>Taxa de Conversão</Stat.Label>
                <Stat.ValueText>68%</Stat.ValueText>
                <Stat.HelpText>Buscas em planejamentos</Stat.HelpText>
              </Stat.Root>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* System Flow Guide */}
        <Card.Root>
          <Card.Header>
            <Heading
              size='lg'
              color='fg.emphasized'
            >
              Como o Sistema Funciona
            </Heading>
            <Text
              color='fg.muted'
              mt='2'
            >
              O Confi conecta organizações a oportunidades relevantes usando inteligência artificial
            </Text>
          </Card.Header>
          <Card.Body>
            <VStack
              align='stretch'
              gap='6'
            >
              {/* Admin Workflow */}
              <Box>
                <HStack mb='4'>
                  <Badge
                    colorPalette='purple'
                    variant='solid'
                    size='lg'
                  >
                    Fluxo do Administrador
                  </Badge>
                </HStack>

                {/* Steps visualization */}
                <HStack
                  gap='2'
                  mb='4'
                  overflowX='auto'
                >
                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiSearch size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Buscar
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiCheckCircle size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Revisar
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiTag size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Tags
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.500'
                      color='white'
                    >
                      <MdOutlineAutoAwesome size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                      color='purple.500'
                    >
                      Avaliar
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='purple.100'
                      color='purple.600'
                    >
                      <FiUsers size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Disponível
                    </Text>
                  </VStack>
                </HStack>

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 5 }}
                  gap='4'
                  mt='4'
                >
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      1. Buscar
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Crie buscas com prompts específicos para encontrar oportunidades
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      2. Revisar
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Aprove oportunidades encontradas antes de disponibilizar
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      3. Criar Tags
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Defina categorias para classificar as oportunidades
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      4. Avaliar
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      IA atribui tags automaticamente às oportunidades
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      5. Disponível
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Sistema pronto para usuários buscarem oportunidades
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* User Workflow */}
              <Box>
                <HStack mb='4'>
                  <Badge
                    colorPalette='blue'
                    variant='solid'
                    size='lg'
                  >
                    Fluxo do Usuário
                  </Badge>
                </HStack>

                {/* Steps visualization */}
                <HStack
                  gap='2'
                  mb='4'
                  justify='center'
                >
                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.100'
                      color='blue.600'
                    >
                      <FiSearch size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Buscar
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    maxW='100px'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.100'
                      color='blue.600'
                    >
                      <FiCheckCircle size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                    >
                      Selecionar
                    </Text>
                  </VStack>

                  <Box
                    flex='1'
                    maxW='100px'
                    h='1px'
                    bg='border.default'
                    alignSelf='center'
                  />

                  <VStack gap='1'>
                    <Box
                      p='3'
                      borderRadius='full'
                      bg='blue.500'
                      color='white'
                    >
                      <FiFileText size='20' />
                    </Box>
                    <Text
                      fontSize='xs'
                      fontWeight='semibold'
                      color='blue.500'
                    >
                      Planejar
                    </Text>
                  </VStack>
                </HStack>

                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap='4'
                  mt='4'
                >
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      1. Buscar Oportunidades
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Preenche formulário com informações da organização
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      2. Selecionar Relevantes
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Escolhe oportunidades mais adequadas ao perfil
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight='semibold'
                      color='fg.emphasized'
                      fontSize='sm'
                    >
                      3. Gerar Planejamento
                    </Text>
                    <Text
                      fontSize='xs'
                      color='fg.muted'
                      mt='1'
                    >
                      Recebe PDF com instruções e calendário de prazos
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Admin Responsibilities */}
        <Card.Root>
          <Card.Header>
            <Heading
              size='lg'
              color='fg.emphasized'
            >
              Suas Responsabilidades como Administrador
            </Heading>
          </Card.Header>
          <Card.Body>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap='6'
            >
              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiSearch size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Manter Oportunidades Atualizadas
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Execute buscas regularmente para encontrar novas oportunidades. Revise e aprove
                  antes de disponibilizar aos usuários.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiTag size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Gerenciar Sistema de Tags
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Crie tags que representem bem as categorias de oportunidades. Quanto melhores as
                  tags, mais preciso será o matching.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <MdOutlineAutoAwesome size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Executar Avaliações
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Rode o processo de avaliação sempre que houver oportunidades sem tags. Isso
                  garante que usuários encontrem resultados.
                </Text>
              </Box>

              <Box>
                <HStack mb='3'>
                  <Box color='purple.500'>
                    <FiUsers size='20' />
                  </Box>
                  <Text
                    fontWeight='semibold'
                    color='fg.emphasized'
                  >
                    Monitorar Qualidade
                  </Text>
                </HStack>
                <Text
                  fontSize='sm'
                  color='fg.muted'
                >
                  Acompanhe as estatísticas e planejamentos criados. Ajuste tags e buscas baseado no
                  que os usuários estão procurando.
                </Text>
              </Box>
            </SimpleGrid>
          </Card.Body>
        </Card.Root>

        {/* Quick Actions Alert */}
        <Alert.Root status='info'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Dica de Início Rápido</Alert.Title>
            <Alert.Description>
              Para começar: 1) Crie uma busca de oportunidades, 2) Revise e aprove as encontradas,
              3) Crie tags relevantes, 4) Execute uma avaliação. Pronto! O sistema está configurado
              para os usuários.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </VStack>
    </Box>
  );
};
