import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandOutput,
} from '@aws-sdk/client-bedrock-runtime';
import { Inject, Logger } from '@nestjs/common';
import { Opportunity } from 'src/domain/opportunity';
import { Tag } from 'src/domain/tag';
import { z } from 'zod';

interface BedrockResponse {
  content: {
    text: string;
  }[];
}

export interface OpportunityTransformer {
  transform(
    opportunities: Record<string, unknown>[],
    availableTags: Tag[]
  ): AsyncIterableIterator<Opportunity>;
}

export const OpportunityTransformer = Symbol('OpportunityTransformer');

export class OpportunityTransformerAwsBedrock implements OpportunityTransformer {
  private readonly logger = new Logger(OpportunityTransformerAwsBedrock.name);

  constructor(
    @Inject(BedrockRuntimeClient) private readonly bedrockRuntimeClient: BedrockRuntimeClient
  ) {}

  /**
   * 1. map opportunity to domain
   * 2. infer tags from the opportunity
   * 4. return the opportunity
   */
  async *transform(
    opportunities: Record<string, unknown>[],
    availableTags: Tag[]
  ): AsyncIterableIterator<Opportunity> {
    if (availableTags.length === 0) return;

    for (const opportunity of opportunities) {
      const prompt = this.buildPrompt(opportunity, availableTags);
      const response = await this.bedrockRuntimeClient.send(
        new InvokeModelCommand({
          modelId: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
          body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            max_tokens: 4000,
            temperature: 0.7,
            anthropic_version: 'bedrock-2023-05-31',
          }),
        })
      );

      yield this.parseResponse(response, availableTags);
    }
  }

  private buildPrompt(opportunity: Record<string, unknown>, availableTags: Tag[]): string {
    const formattedData = this.formatDataForAnalysis(opportunity);
    const formattedTags = availableTags.map((tag) => `- ${tag.slug}`).join('\n');

    return `
Você é o ConFI, um agente especializado em apoiar negócios sociais a acessar oportunidades internacionais de funding.

TAREFA: Analise os dados da oportunidade fornecidos abaixo e estruture as informações no formato JSON especificado. Selecione também as tags mais relevantes da lista disponível.

DADOS DA OPORTUNIDADE:
${formattedData}

TAGS DISPONÍVEIS:
${formattedTags}

DIRETRIZES:
- Responda somente em português do brasil
- Foque em oportunidades internacionais (de multinacionais, órgãos, empresas e entidades de fora do brasil)
- Todos os requisitos devem começar com substantivo ou verbo no infinitivo
- Para enrollmentDeadline, use: data exata, mês previsto baseado em editais anteriores, ou "Aberto continuamente"
- Para preparationTime, use o formato: "X semanas"

TIPOS DE OPORTUNIDADES QUE SE APLICAM:
- Investimento em Dinheiro (fundo perdido ou com retorno previsto)
- Fellowship, Aceleração, Formação em Liderança
- Bolsas (MBA, Mestrado, cursos relacionados)
- Doações para empreendedores sociais ou ações ESG/Responsabilidade social

FORMATO DE RESPOSTA (JSON):
{
  "name": "string - Resumo do tipo de apoio oferecido em até 1 linha",
  "description": "string - Descrição detalhada da oportunidade",
  "benefits": ["string[]" - Lista dos principais benefícios],
  "requirements": ["string[]" - 2 a 5 requisitos relevantes, começando com substantivo ou verbo no infinitivo],
  "enrollmentDeadline": "string - Data exata, mês previsto ou 'Aberto continuamente'",
  "preparationTime": "string - Tempo estimado no formato 'X semanas'",
  "requiredDocumentation": ["string[]" - Lista de documentos necessários: formulário, pitch, documentos traduzidos, estudo de viabilidade, etc.],
  "link": "string - Link direto e funcional para o edital",
  "tags": ["string[]" - Tags relevantes da lista disponível]
}

Retorne apenas o JSON estruturado sem texto adicional.
    `;
  }

  private formatDataForAnalysis(data: Record<string, unknown>): string {
    const formatValue = (value: unknown, depth = 0): string => {
      if (depth > 3) return '[nested object]';

      if (value === null || value === undefined) {
        return 'null';
      }

      if (typeof value === 'string') {
        return value;
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
      }

      if (Array.isArray(value)) {
        return value.map((item) => formatValue(item, depth + 1)).join(', ');
      }

      if (typeof value === 'object') {
        try {
          return Object.entries(value as Record<string, unknown>)
            .map(([key, val]) => `${key}: ${formatValue(val, depth + 1)}`)
            .join('; ');
        } catch {
          return '[object]';
        }
      }

      // For other types, convert safely to string
      return '[unknown]';
    };

    return Object.entries(data)
      .map(([key, value]) => `${key}: ${formatValue(value)}`)
      .join('\n');
  }

  private parseResponse(response: InvokeModelCommandOutput, availableTags: Tag[]): Opportunity {
    const responseBody = JSON.parse(response.body.transformToString()) as BedrockResponse;
    const content = responseBody.content[0]?.text;
    if (!content) throw new Error('Failed to get response content');

    const data = z
      .object({
        benefits: z.array(z.string()),
        description: z.string(),
        enrollmentDeadline: z.string(),
        link: z.string().nullable(),
        name: z.string(),
        preparationTime: z.string(),
        requirements: z.array(z.string()),
        requiredDocumentation: z.array(z.string()),
        tags: z.array(z.string()),
      })
      .parse(JSON.parse(content));

    const tags = data.tags.filter((tag) => availableTags.some((t) => t.slug === tag));

    return Opportunity.create({ ...data, tags, searchId: null, status: 'ACTIVE' });
  }
}
