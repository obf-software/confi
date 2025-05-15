import { createListCollection } from '@chakra-ui/react';
import { z } from 'zod';

export type FormPageId = 'name' | 'diversity' | 'briefing';

export const formDataSchema = z.object({
  organizationName: z.string().min(1),
  organizationBriefing: z.string().min(1),
  activityRegion: z.string().min(1),
  organizationType: z.string().min(1),
  activityTime: z.string().min(1),
  businessStage: z.string().min(1),
  ods: z.string().min(1),
  minorityGroups: z.string().min(1).array().min(1),
  englishLevel: z.string().min(1),
});

export type FormData = z.infer<typeof formDataSchema>;

export const organizationTypeCollection = createListCollection({
  items: ['Informal (sem CNPJ)', 'Negócio', 'ONG / OSCIP (Associação ou Fundação)', 'Cooperativa'],
});

export const activityTimeCollection = createListCollection({
  items: ['Menos de 1 ano', 'Entre 1 e 3 anos', 'Entre 3 e 5 anos', 'Mais de 5 anos'],
});

export const businessStageCollection = createListCollection({
  items: ['Ideação', 'Validação', 'Tração', 'Escala'],
});

export const odsCollection = createListCollection({
  items: [
    'Pobreza - ODS 1',
    'Fome - ODS 2',
    'Saúde - ODS 3',
    'Educação - ODS 4',
    'Gênero - ODS 5',
    'Água - ODS 6',
    'Energia - ODS 7',
    'Trabalho - ODS 8',
    'Inovação - ODS 9',
    'Desigualdade - ODS 10',
    'Cidades - ODS 11',
    'Consumo - ODS 12',
    'Clima - ODS 13',
    'Vida Marinha - ODS 14',
    'Vida Terrestre - ODS 15',
    'Paz - ODS 16',
    'Parcerias - ODS 17',
  ],
});

export const minorityGroupCollection = createListCollection({
  items: [
    'Mulheres',
    'População Indígena',
    'Jovem (15-29 anos)',
    'LGBTQIA+',
    'Pretos/Pardos',
    'Cidadão da União Europeia',
  ],
});

export const englishLevelCollection = createListCollection({
  items: [
    'Sim, com nível intermediário de inglês',
    'Sim, com nível avançado de inglês',
    'Ainda não',
  ],
});
