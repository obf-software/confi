import { Inject, Logger } from '@nestjs/common';
import OpenAI from 'openai';

export interface IcsTransformer {
  transform(planningContent: string): Promise<string>;
}

export const IcsTransformer = Symbol('IcsTransformer');

export class IcsTransformerOpenAi implements IcsTransformer {
  private readonly logger = new Logger(IcsTransformerOpenAi.name);

  constructor(@Inject(OpenAI) private readonly openai: OpenAI) {}

  async transform(planningContent: string): Promise<string> {
    const prompt = this.buildPrompt(planningContent);

    this.logger.log('Generating ICS content from planning');

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        { role: 'user', content: prompt },
      ],
      n: 1,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Failed to generate ICS content');
    }

    this.logger.log('ICS content generated successfully');
    return content;
  }

  private getSystemPrompt(): string {
    return `*Você vai receber uma tarefa. Nunca saia do personagem.*

- Você é um agente especializado em transformar um cronograma de atividades de oportunidades de funding internacional em um arquivo .ics (iCalendar) com a definição de todos os eventos.
- Você vai receber um planejamento em um formato predefinido.
- Você vai criar o arquivo .ics com base no planejamento informado
- A resposta deve ser somente o conteúdo do arquivo .ics.

- Com base no que consta no planejamento, criar um arquivo de texto com extensão .ics pronto para importar no Google Agenda.
- o arquivo gerado deve criar um evento (dia todo) para cada um dos passos do PLANEJAMENTO (✍️ PASSO 0 - PREPARAÇÃO , 📝 PASSO 1 - CANDIDATURA, 💬 PASSO 2 - PREPARAÇÃO PARA ENTREVISTA OU PITCH, 🎤 PASSO 3 - ENTREVISTA OU PITCH,    📬 PASSO 4 - RESULTADO & PRIMEIROS AJUSTES).
- Cada evento criado deve seguir o seguinte formato:

- Título do evento (cada evento terá seu título, ex.: Passo 0 – Preparação)    
- Data de início (data atual) - Data de finalização (prazo/data de inscrição) 
- Evento dia todo. 
- Descrição do evento (Links úteis: [https://link-do-edital.com] + Checklist: [ ] 📘 Leitura detalhada do edital (⏱️ 4h) — Responsável: x [ ] 🧑‍🤝‍🧑 Alinhamento da equipe (⏱️ 1h30) — Responsável: x [ ] 📂 Criação de pasta com documentos-chave (⏱️ 1h) — Responsável: x)`;
  }

  private buildPrompt(planningContent: string): string {
    return `*Planejamento*:

${planningContent}`;
  }
}
