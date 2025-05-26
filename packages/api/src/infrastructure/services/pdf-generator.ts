import { Injectable, Logger } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PlanningData } from 'src/domain/planning-data';

export interface PdfGenerator {
  generatePdf(planningData: PlanningData): Promise<Buffer>;
}

export const PdfGenerator = Symbol('PdfGenerator');

@Injectable()
export class PdfGeneratorPuppeteer implements PdfGenerator {
  private readonly logger = new Logger(PdfGeneratorPuppeteer.name);

  async generatePdf(planningData: PlanningData): Promise<Buffer> {
    this.logger.log('Generating PDF from planning data');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();

      const html = this.generateHtml(planningData);
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      this.logger.log('PDF generated successfully');
      return Buffer.from(pdfBuffer);
    } finally {
      await browser.close();
    }
  }

  private generateHtml(planningData: PlanningData): string {
    const opportunitiesHtml = planningData.opportunities
      .map(
        (opp) => `
        <div class="opportunity-card">
          <h3 class="opportunity-title">${opp.name}</h3>
          <div class="opportunity-details">
            <div class="deadline">
              <span class="label">📅 Prazo:</span>
              <span class="value">${opp.enrollmentDeadline}</span>
            </div>
            <div class="link">
              <span class="label">🔗 Link:</span>
              <a href="${opp.link}" class="opportunity-link">${opp.link}</a>
            </div>
          </div>
          <div class="benefits">
            <span class="label">💎 Benefícios:</span>
            <ul class="benefits-list">
              ${opp.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
      )
      .join('');

    const stepsHtml = planningData.steps
      .map(
        (step) => `
        <div class="step-section">
          <div class="step-header">
            <span class="step-emoji">${step.emoji}</span>
            <h2 class="step-title">${step.title}</h2>
          </div>
          ${step.description ? `<p class="step-description">${step.description}</p>` : ''}
          
          ${
            step.metadata
              ? `
            <div class="step-metadata">
              ${step.metadata.date ? `<div class="metadata-item"><strong>Data:</strong> ${step.metadata.date}</div>` : ''}
              ${step.metadata.time ? `<div class="metadata-item"><strong>Horário:</strong> ${step.metadata.time}</div>` : ''}
              ${step.metadata.location ? `<div class="metadata-item"><strong>Local:</strong> ${step.metadata.location}</div>` : ''}
              ${step.metadata.responsible ? `<div class="metadata-item"><strong>Responsável:</strong> ${step.metadata.responsible}</div>` : ''}
            </div>
          `
              : ''
          }

          <div class="tasks-container">
            ${this.groupTasksByWeek(step.tasks)}
          </div>
        </div>
      `
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Planejamento de Inscrição - Oportunidades Internacionais</title>
        <style>
          ${this.getStyles()}
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <div class="brand">
              <h1 class="main-title">📋 PLANEJAMENTO DE INSCRIÇÃO</h1>
              <p class="subtitle">Oportunidades Internacionais de Funding</p>
            </div>
            <div class="header-decoration"></div>
          </header>

          <section class="opportunities-section">
            <h2 class="section-title">🎯 Oportunidades Selecionadas</h2>
            <div class="opportunities-grid">
              ${opportunitiesHtml}
            </div>
          </section>

          <section class="planning-section">
            <h2 class="section-title">📋 Cronograma de Execução</h2>
            ${stepsHtml}
          </section>

          <footer class="footer">
            <div class="footer-content">
              <p>Gerado pela <strong>CONFI</strong> • ${new Date().toLocaleDateString('pt-BR')}</p>
              <p class="footer-note">Este planejamento foi criado para maximizar suas chances de sucesso nas oportunidades de funding internacional.</p>
            </div>
          </footer>
        </div>
      </body>
      </html>
    `;
  }

  private groupTasksByWeek(
    tasks: Array<{ id: string; description: string; estimatedTime?: string; week?: number }>
  ): string {
    const tasksByWeek = tasks.reduce(
      (acc, task) => {
        const week = task.week || 0;
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(task);
        return acc;
      },
      {} as Record<
        number,
        Array<{ id: string; description: string; estimatedTime?: string; week?: number }>
      >
    );

    const weekNumbers = Object.keys(tasksByWeek).map(Number).sort();

    return weekNumbers
      .map((weekNum) => {
        if (weekNum === 0) {
          // Tasks without week specified
          return tasksByWeek[weekNum]
            .map(
              (task) => `
              <div class="task-item">
                <div class="task-checkbox">☐</div>
                <div class="task-content">
                  <span class="task-description">${task.description}</span>
                  ${task.estimatedTime ? `<span class="task-time">⏱️ ${task.estimatedTime}</span>` : ''}
                  <div class="task-responsible">Responsável: _____________________</div>
                </div>
              </div>
            `
            )
            .join('');
        }

        return `
          <div class="week-group">
            <h4 class="week-title">📅 Semana ${weekNum}</h4>
            <div class="week-tasks">
              ${tasksByWeek[weekNum]
                .map(
                  (task) => `
                  <div class="task-item">
                    <div class="task-checkbox">☐</div>
                    <div class="task-content">
                      <span class="task-description">${task.description}</span>
                      ${task.estimatedTime ? `<span class="task-time">⏱️ ${task.estimatedTime}</span>` : ''}
                      <div class="task-responsible">Responsável: _____________________</div>
                    </div>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>
        `;
      })
      .join('');
  }

  private getStyles(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #2c3e50;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        border-radius: 12px;
        overflow: hidden;
      }

      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 30px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .header-decoration {
        position: absolute;
        top: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
      }

      .main-title {
        font-size: 2.5em;
        font-weight: 700;
        margin-bottom: 10px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }

      .subtitle {
        font-size: 1.2em;
        font-weight: 300;
        opacity: 0.9;
      }

      .section-title {
        color: #2c3e50;
        font-size: 1.8em;
        font-weight: 600;
        margin: 30px 0 20px 0;
        padding: 0 30px;
        border-left: 4px solid #667eea;
        padding-left: 20px;
      }

      .opportunities-section,
      .planning-section {
        padding: 0 30px;
      }

      .opportunities-grid {
        display: grid;
        gap: 20px;
        margin-bottom: 40px;
      }

      .opportunity-card {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 25px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        transition: transform 0.2s ease;
      }

      .opportunity-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.1);
      }

      .opportunity-title {
        color: #2c3e50;
        font-size: 1.3em;
        font-weight: 600;
        margin-bottom: 15px;
        border-bottom: 2px solid #667eea;
        padding-bottom: 8px;
      }

      .opportunity-details {
        display: grid;
        gap: 10px;
        margin-bottom: 15px;
      }

      .deadline,
      .link {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .label {
        font-weight: 600;
        color: #495057;
        min-width: 80px;
      }

      .value {
        color: #6c757d;
      }

      .opportunity-link {
        color: #667eea;
        text-decoration: none;
        word-break: break-all;
      }

      .opportunity-link:hover {
        text-decoration: underline;
      }

      .benefits {
        margin-top: 15px;
      }

      .benefits-list {
        margin-left: 20px;
        margin-top: 8px;
      }

      .benefits-list li {
        margin-bottom: 5px;
        color: #495057;
      }

      .step-section {
        margin: 40px 0;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      }

      .step-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 25px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .step-emoji {
        font-size: 2em;
      }

      .step-title {
        font-size: 1.5em;
        font-weight: 600;
      }

      .step-description {
        padding: 20px 25px 0;
        color: #6c757d;
        font-style: italic;
      }

      .step-metadata {
        padding: 15px 25px;
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
      }

      .metadata-item {
        color: #495057;
        font-size: 0.9em;
      }

      .tasks-container {
        padding: 25px;
      }

      .week-group {
        margin-bottom: 30px;
      }

      .week-title {
        color: #667eea;
        font-size: 1.2em;
        font-weight: 600;
        margin-bottom: 15px;
        padding: 10px 15px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }

      .week-tasks {
        margin-left: 20px;
      }

      .task-item {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        padding: 15px;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .task-item:hover {
        background: #f8f9fa;
        border-color: #667eea;
      }

      .task-checkbox {
        font-size: 1.2em;
        color: #667eea;
        font-weight: bold;
        margin-top: 2px;
      }

      .task-content {
        flex: 1;
      }

      .task-description {
        display: block;
        font-weight: 500;
        color: #2c3e50;
        margin-bottom: 8px;
      }

      .task-time {
        display: inline-block;
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8em;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .task-responsible {
        color: #6c757d;
        font-size: 0.9em;
        border-bottom: 1px dotted #6c757d;
        display: inline-block;
        padding-bottom: 2px;
      }

      .footer {
        background: #2c3e50;
        color: white;
        padding: 30px;
        text-align: center;
        margin-top: 40px;
      }

      .footer-content p {
        margin-bottom: 10px;
      }

      .footer-note {
        font-size: 0.9em;
        opacity: 0.8;
        font-style: italic;
      }

      @media print {
        body {
          background: white;
        }
        
        .container {
          box-shadow: none;
          border-radius: 0;
        }
        
        .task-item:hover {
          background: white;
          border-color: #e9ecef;
        }
      }
    `;
  }
}
