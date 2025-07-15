import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { Inject, Logger } from '@nestjs/common';
import { Opportunity } from 'src/domain/opportunity';
import { PlanningData } from 'src/domain/planning-data';
import { z } from 'zod';

interface BedrockResponse {
  content: {
    text: string;
  }[];
}

export interface PlanningTransformer {
  /**
   * Transform a list of opportunities into a planning data.
   */
  transformOpportunitiesIntoPlanningData(opportunities: Opportunity[]): Promise<PlanningData>;

  /**
   * Transform a planning data into a ICS content.
   */
  transformPlanningDataIntoIcsContent(planningData: PlanningData): Promise<string>;
}

export const PlanningTransformer = Symbol('PlanningTransformer');

export class PlanningTransformerAwsBedrock implements PlanningTransformer {
  private readonly logger = new Logger(PlanningTransformerAwsBedrock.name);

  constructor(
    @Inject(BedrockRuntimeClient) private readonly bedrockRuntimeClient: BedrockRuntimeClient
  ) {}

  async transformOpportunitiesIntoPlanningData(
    opportunities: Opportunity[]
  ): Promise<PlanningData> {
    const response = await this.bedrockRuntimeClient.send(
      new InvokeModelCommand({
        modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `${this.getSystemPromptForPlanningData()}\n\n${this.buildPromptForPlanningData(opportunities)}`
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
          anthropic_version: 'bedrock-2023-05-31'
        })
      })
    );

    const responseBody = JSON.parse(response.body.transformToString()) as BedrockResponse;
    const content = responseBody.content[0]?.text;
    if (!content) throw new Error('Failed to generate planning content');
    return this.parseResponseForPlanningData(content);
  }

  private getSystemPromptForPlanningData(): string {
    return `*Você vai receber uma tarefa. Nunca saia do personagem.*

- Você é um agente especializado em fazer um cronograma estruturado para oportunidades de funding internacional.
- Você vai receber uma lista de oportunidades.
- Você deve retornar dados estruturados em JSON para criar um planejamento visual profissional.

FORMATO DE RESPOSTA (JSON):
{
  "opportunities": [
    {
      "name": "string - Nome da oportunidade",
      "benefits": ["string[]" - Lista dos principais benefícios],
      "enrollmentDeadline": "string - Prazo de inscrição",
      "link": "string - Link oficial"
    }
  ],
  "steps": [
    {
      "id": "step-0",
      "title": "PREPARAÇÃO",
      "emoji": "✍️",
      "description": "Fase inicial de preparação e documentação",
      "tasks": [
        {
          "id": "task-1",
          "description": "Leitura detalhada do edital",
          "estimatedTime": "4h",
          "week": 1
        },
        {
          "id": "task-2", 
          "description": "Alinhamento da equipe responsável",
          "estimatedTime": "1h30",
          "week": 1
        },
        {
          "id": "task-3",
          "description": "Criação de pasta com documentos-chave",
          "estimatedTime": "1h",
          "week": 1
        },
        {
          "id": "task-4",
          "description": "Rascunho do estudo de viabilidade e plano de escalabilidade",
          "estimatedTime": "8h",
          "week": 2
        },
        {
          "id": "task-5",
          "description": "Reunião com mentor ou especialista externo da CONFI para feedback",
          "estimatedTime": "2h",
          "week": 2
        },
        {
          "id": "task-6",
          "description": "Compilação de dados e resultados de impacto",
          "estimatedTime": "6h",
          "week": 3
        },
        {
          "id": "task-7",
          "description": "Atualização dos documentos financeiros",
          "estimatedTime": "4h",
          "week": 3
        },
        {
          "id": "task-8",
          "description": "Rascunho das respostas do formulário de inscrição online (em inglês)",
          "estimatedTime": "8h",
          "week": 4
        },
        {
          "id": "task-9",
          "description": "Revisão linguística e técnica dos documentos",
          "estimatedTime": "4h",
          "week": 4
        },
        {
          "id": "task-10",
          "description": "Teste de submissão / checklist completo",
          "estimatedTime": "2h",
          "week": 5
        },
        {
          "id": "task-11",
          "description": "Aprovação interna do rascunho do formulário de inscrição",
          "estimatedTime": "1h",
          "week": 5
        }
      ]
    },
    {
      "id": "step-1",
      "title": "CANDIDATURA", 
      "emoji": "📝",
      "description": "Submissão da candidatura e acompanhamento",
      "tasks": [
        {
          "id": "task-12",
          "description": "Revisão do rascunho aprovado",
          "estimatedTime": "2h"
        },
        {
          "id": "task-13",
          "description": "Submissão da candidatura",
          "estimatedTime": "1h"
        },
        {
          "id": "task-14",
          "description": "Acompanhamento dos e-mails de retorno do processo seletivo, incluindo caixa de spam/promoções",
          "estimatedTime": "Contínuo"
        }
      ]
    },
    {
      "id": "step-2", 
      "title": "PREPARAÇÃO PARA ENTREVISTA OU PITCH",
      "emoji": "💬",
      "description": "Preparação para a etapa de entrevista/pitch",
      "tasks": [
        {
          "id": "task-15",
          "description": "Simulação com especialista da CONFI para preparação",
          "estimatedTime": "2h"
        },
        {
          "id": "task-16",
          "description": "Conversa com ex-participantes do programa ou organizações que já participaram da seleção",
          "estimatedTime": "1h"
        },
        {
          "id": "task-17",
          "description": "Produzir materiais de apoio para a entrevista (Ex.: anotações, versões impressas do planejamento de execução da proposta, etc)",
          "estimatedTime": "3h"
        },
        {
          "id": "task-18",
          "description": "Testar conexão de internet & baixar programas necessários (ex.: zoom, teams, etc)",
          "estimatedTime": "30min"
        }
      ]
    },
    {
      "id": "step-3",
      "title": "ENTREVISTA OU PITCH",
      "emoji": "🎤", 
      "description": "Realização da entrevista ou apresentação do pitch",
      "tasks": [
        {
          "id": "task-19",
          "description": "Participação na entrevista ou apresentação do pitch",
          "estimatedTime": "1-2h"
        }
      ],
      "metadata": {
        "date": "A definir",
        "time": "A definir", 
        "location": "A definir"
      }
    },
    {
      "id": "step-4",
      "title": "RESULTADO & PRIMEIROS AJUSTES",
      "emoji": "📬",
      "description": "Recebimento do resultado e primeiros ajustes se aprovado",
      "tasks": [
        {
          "id": "task-20",
          "description": "Leitura detalhada das Regras de Aceite",
          "estimatedTime": "2h"
        },
        {
          "id": "task-21",
          "description": "Assinar contratos",
          "estimatedTime": "1h"
        },
        {
          "id": "task-22",
          "description": "Tirar dúvidas",
          "estimatedTime": "1h"
        },
        {
          "id": "task-23",
          "description": "Alinhamento da equipe responsável",
          "estimatedTime": "1h30"
        },
        {
          "id": "task-24",
          "description": "Criação de pasta com documentos-chave",
          "estimatedTime": "1h"
        }
      ]
    }
  ]
}

Retorne apenas o JSON estruturado sem texto adicional.`;
  }

  private buildPromptForPlanningData(opportunities: Opportunity[]): string {
    const opportunitiesJson = opportunities.map((opportunity) => ({
      name: opportunity.name,
      description: opportunity.description,
      benefits: opportunity.benefits,
      requirements: opportunity.requirements,
      enrollmentDeadline: opportunity.enrollmentDeadline,
      preparationTime: opportunity.preparationTime,
      requiredDocumentation: opportunity.requiredDocumentation,
      link: opportunity.link,
    }));

    return `Oportunidades selecionadas:

${JSON.stringify(opportunitiesJson, null, 2)}`;
  }

  private parseResponseForPlanningData(content: string): PlanningData {
    const planningTaskSchema = z.object({
      id: z.string(),
      description: z.string(),
      estimatedTime: z.string().optional(),
      responsible: z.string().optional(),
      week: z.number().optional(),
      completed: z.boolean().optional(),
    });

    const planningStepSchema = z.object({
      id: z.string(),
      title: z.string(),
      emoji: z.string(),
      description: z.string().optional(),
      tasks: z.array(planningTaskSchema),
      metadata: z
        .object({
          date: z.string().optional(),
          time: z.string().optional(),
          location: z.string().optional(),
          responsible: z.string().optional(),
        })
        .optional(),
    });

    const opportunityPlanningDataSchema = z.object({
      name: z.string(),
      benefits: z.array(z.string()),
      enrollmentDeadline: z.string(),
      link: z.string(),
    });

    const planningDataSchema = z.object({
      opportunities: z.array(opportunityPlanningDataSchema),
      steps: z.array(planningStepSchema),
    });

    try {
      return planningDataSchema.parse(JSON.parse(content));
    } catch (error) {
      this.logger.error(`Failed to parse planning data: ${String(error)}`);
      throw new Error(`Failed to parse planning data: ${String(error)}`);
    }
  }

  async transformPlanningDataIntoIcsContent(planningData: PlanningData): Promise<string> {
    const response = await this.bedrockRuntimeClient.send(
      new InvokeModelCommand({
        modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `${this.getSystemPromptForIcsContent()}\n\n${this.buildPromptForIcsContent(planningData)}`
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
          anthropic_version: 'bedrock-2023-05-31'
        })
      })
    );

    const responseBody = JSON.parse(response.body.transformToString()) as BedrockResponse;
    const content = responseBody.content[0]?.text;
    if (!content) throw new Error('Failed to generate ICS content');
    return content;
  }

  private getSystemPromptForIcsContent(): string {
    return `*Você vai receber uma tarefa. Nunca saia do personagem.*

- Você é um agente especializado em transformar um cronograma de atividades de oportunidades de funding internacional em um arquivo .ics (iCalendar) com a definição de todos os eventos.
- Você vai receber um planejamento em um formato predefinido.
- Você vai criar o arquivo .ics com base no planejamento informado
- A resposta deve ser somente o conteúdo do arquivo .ics.

- Com base no que consta no planejamento, criar um arquivo de texto com extensão .ics pronto para importar no Google Agenda.
- o arquivo gerado deve criar um evento (dia todo) para cada um dos passos do PLANEJAMENTO (✍️ PASSO 0 - PREPARAÇÃO , 📝 PASSO 1 - CANDIDATURA, 💬 PASSO 2 - PREPARAÇÃO PARA ENTREVISTA OU PITCH, 🎤 PASSO 3 - ENTREVISTA OU PITCH,    📬 PASSO 4 - RESULTADO & PRIMEIROS AJUSTES).
- Cada evento criado deve seguir o seguinte formato:

- Título do evento (cada evento terá seu título, ex.: Passo 0 - Preparação)    
- Data de início (data atual) - Data de finalização (prazo/data de inscrição) 
- Evento dia todo. 
- Descrição do evento (Links úteis: [https://link-do-edital.com] + Checklist: [ ] 📘 Leitura detalhada do edital (⏱️ 4h) — Responsável: x [ ] 🧑‍🤝‍🧑 Alinhamento da equipe (⏱️ 1h30) — Responsável: x [ ] 📂 Criação de pasta com documentos-chave (⏱️ 1h) — Responsável: x)`;
  }

  private buildPromptForIcsContent(planningData: PlanningData): string {
    return `*Planejamento*:

${JSON.stringify(planningData, null, 2)}`;
  }
}
