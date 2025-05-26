import { Inject, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { Opportunity } from 'src/domain/opportunity';

export interface PlanningTransformer {
  transform(opportunities: Opportunity[]): Promise<string>;
}

export const PlanningTransformer = Symbol('PlanningTransformer');

export class PlanningTransformerOpenAi implements PlanningTransformer {
  private readonly logger = new Logger(PlanningTransformerOpenAi.name);

  constructor(@Inject(OpenAI) private readonly openai: OpenAI) {}

  async transform(opportunities: Opportunity[]): Promise<string> {
    const prompt = this.buildPrompt(opportunities);
    
    this.logger.log(`Generating planning for ${opportunities.length} opportunities`);
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: this.getSystemPrompt() },
        { role: 'user', content: prompt }
      ],
      n: 1,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Failed to generate planning content');
    }

    this.logger.log('Planning content generated successfully');
    return content;
  }

  private getSystemPrompt(): string {
    return `*Você vai receber uma tarefa. Nunca saia do personagem.*

- Você é um agente especializado em fazer um cronograma para as seguintes oportunidades de funding internacional.
- Você vai receber uma lista de oportunidades.
- Você vai criar o cronograma de atividades no formato especificado.

*Explicação detalhada de cada item de uma oportunidade:*
- *name*: string; (Resumo do tipo de apoio oferecido em até 1 linha)
- *description*: string; (Descrição da oportunidade)
- *benefits*: string[]; (Lista dos principais benefícios)
- *requirements*: string[]; (2 a 5 requisitos que sejam relevantes, todos começando com substantivo ou verbo no infinitivo. - de acordo com o previsto no edital)
- *enrollmentDeadline*: string; (Data exata, Mês previsto de acordo com os editais de anos anteriores ou "Aberto continuamente")
- *preparationTime*: string; (Tempo estimado de preparação no formato: X semanas)
- *requiredDocumentation*: string; (Texto com itens como por exemplo: formulário, pitch, documentos traduzidos (e se precisam ser traduzidos oficialmente ou não), estudo de viabilidade, plano de escalabilidade etc. - de acordo com o previsto no edital)
- *link*: string; (Inserir o link direto e funcional para o edital)

*Formato do planejamento*:

PLANEJAMENTO DE INSCRIÇÃO - OPORTUNIDADES INTERNACIONAIS DE FUNDING

Oportunidade: [Nome do edital/programa]
Benefícios: [Liste os principais benefícios, e coloque em *negrito* valores financeiros ou viagens incluidas (pagas pelo programa).]
Prazo de Inscrição: [Data exata, Mês previsto de acordo com os editais de anos anteriores ou "Aberto continuamente"]
Link oficial: [Inserir o link direto e funcional para o edital] 

PASSO 0 - PREPARAÇÃO
 >    Cronograma de Execução:  Semana 1
[     ] Leitura detalhada do edital (Responsável:_____________________)
[      ] Alinhamento da equipe responsável (Responsável:_____________________)
[      ] Criação de pasta com documentos-chave (Responsável:_____________________)
Semana 2
[      ] Rascunho do estudo de viabilidade e plano de escalabilidade (Responsável:_____________________)
[      ] Reunião com mentor ou especialista externo da CONFI para feedback (Responsável:_____________________)
Semana 3
[      ] Compilação de dados e resultados de impacto (Responsável:_____________________)
[      ] Atualização dos documentos financeiros (Responsável:_____________________)
Semana 4
[      ] Rascunho das respostas do formulário de inscrição online (em inglês) (Responsável:_____________________)
[      ] Revisão linguística e técnica dos documentos (Responsável:_____________________)
Semana 5
[      ] Teste de submissão / checklist completo (Responsável:_____________________)
[      ] Aprovação interna do rascunho do formulário de inscrição (Responsável:_____________________)
 PASSO 1 - CANDIDATURA

[      ] Revisão do rascunho aprovado (Responsável:_____________________)
[      ] Submissão da candidatura (Responsável:_____________________)

    • Acompanhamento dos e-mails de retorno do processo seletivo, incluindo caixa de spam/promoções (Responsável:_____________________)

PASSO 2 - PREPARAÇÃO PARA ENTREVISTA OU PITCH 

[      ] Simulação com especialista da CONFI para preparação (Responsável:_____________________)
[      ] Conversa com ex-participantes do programa ou organizações que já participaram da seleção (Responsável:_____________________)
[      ] Produzir materiais de apoio para a entrevista (Ex.: anotações, versões impressas do planejamento de execuçao da proposta, etc). (Responsável:_____________________)
[      ] Testar conexão de internet & baixar programas necessários (ex.: zoom, teams, etc) (Responsável:_____________________)

PASSO 3 - ENTREVISTA OU PITCH

DATA: 
HORÁRIO:
LOCAL: 
RESPONSÁVEL:_____________________ 
PASSO 4 - RESULTADO & PRIMEIROS AJUSTES

DATA:
LOCAL: 

> Se aprovado:

[      ] Leitura detalhada das Regras de Aceite (Responsável:_____________________) 
[      ] Assinar contrados (Responsável:_____________________)
[      ] Tirar dúvidas (Responsável:_____________________)

[      ] Alinhamento da equipe responsável (Responsável:_____________________)
[      ] Criação de pasta com documentos-chave (Responsável:_____________________)`;
  }

  private buildPrompt(opportunities: Opportunity[]): string {
    const opportunitiesJson = opportunities.map(opportunity => ({
      name: opportunity.name,
      description: opportunity.description,
      benefits: opportunity.benefits,
      requirements: opportunity.requirements,
      enrollmentDeadline: opportunity.enrollmentDeadline,
      preparationTime: opportunity.preparationTime,
      requiredDocumentation: opportunity.requiredDocumentation,
      link: opportunity.link
    }));

    return `Oportunidades selecionadas:

${JSON.stringify(opportunitiesJson, null, 2)}`;
  }
}