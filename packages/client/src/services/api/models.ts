import { z } from 'zod';

export const opportunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  benefits: z.array(z.string()),
  requirements: z.array(z.string()),
  enrollmentDeadline: z.string(),
  preparationTime: z.string(),
  requiredDocumentation: z.array(z.string()),
  link: z.string().nullable(),
  createdAt: z.date({ coerce: true }),
  updatedAt: z.date({ coerce: true }),
  tags: z.array(z.string()),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

export const planningSchema = z.object({
  id: z.string(),
  pdfUrl: z.string(),
  icsUrl: z.string(),
});

export type Planning = z.infer<typeof planningSchema>;
