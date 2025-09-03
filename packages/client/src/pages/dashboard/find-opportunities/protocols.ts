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
  minorityGroups: z.string().min(1).array().default([]),
  englishLevel: z.string().min(1),
});

export type FormData = z.infer<typeof formDataSchema>;

export const organizationTypeCollection = createListCollection({
  items: [
    'Informal (no CNPJ)',
    'Business',
    'NGO / OSCIP (Association or Foundation)',
    'Cooperative',
  ],
});

export const activityTimeCollection = createListCollection({
  items: [
    'Less than 1 year',
    'Between 1 and 3 years',
    'Between 3 and 5 years',
    'More than 5 years',
  ],
});

export const businessStageCollection = createListCollection({
  items: ['Ideation', 'Validation', 'Traction', 'Scale'],
});

export const odsCollection = createListCollection({
  items: [
    'Pobreza - ODS 1',
    'Fome - ODS 2',
    'Health - SDG 3',
    'Education - SDG 4',
    'Gender - SDG 5',
    'Water - SDG 6',
    'Energia - ODS 7',
    'Work - SDG 8',
    'Innovation - SDG 9',
    'Inequality - SDG 10',
    'Cidades - ODS 11',
    'Consumo - ODS 12',
    'Clima - ODS 13',
    'Marine Life - SDG 14',
    'Terrestrial Life - SDG 15',
    'Paz - ODS 16',
    'Partnerships - SDG 17',
  ],
});

export const minorityGroupCollection = createListCollection({
  items: [
    'Women',
    'Indigenous Population',
    'Young (15-29 years)',
    'LGBTQIA+',
    'Black/Brown',
    'European Union Citizen',
  ],
});

export const englishLevelCollection = createListCollection({
  items: [
    'Yes, with intermediate level of English',
    'Yes, with advanced level of English',
    'Not yet',
  ],
});
