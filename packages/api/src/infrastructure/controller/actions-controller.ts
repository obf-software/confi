import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanning } from 'src/application/create-planning';
import { FindOpportunities } from 'src/application/find-opportunities';
import { LoadOpportunities } from 'src/application/load-opportunities';
import { Opportunity } from 'src/domain/opportunity';
import { Planning } from 'src/domain/planning';

@ApiTags('Actions')
@Controller('api/v0/actions')
export class ActionsController {
  constructor(
    private readonly findOpportunities: FindOpportunities,
    private readonly loadOpportunities: LoadOpportunities,
    private readonly createPlanning: CreatePlanning
  ) {}

  @ApiOperation({
    summary: 'Load opportunities',
    description:
      'Load raw opportunities from the source, transform them into opportunities and save them to the database',
  })
  @ApiResponse({
    status: 200,
    description: 'The opportunities were loaded successfully',
    type: [Opportunity],
  })
  @Post('load-opportunities')
  async loadOpportunitiesHandler() {
    const output = await this.loadOpportunities.execute();
    return output.opportunities;
  }

  @ApiOperation({
    summary: 'Find opportunities',
    description:
      'Find opportunities in the database based on the provided form input. The form input is a JSON object that contains the form data.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The opportunities were found successfully',
    type: [Opportunity],
  })
  @Post('find-opportunities')
  async findOpportunitiesHandler(@Body() body: Record<string, unknown>) {
    const output = await this.findOpportunities.execute({ formInput: body });
    return output.opportunities;
  }

  @ApiOperation({
    summary: 'Create planning',
    description:
      'Create a planning document and calendar file for the provided opportunities. Returns URLs to PDF and ICS files.',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              opportunities: {
                type: 'array',
                items: { $ref: '#/components/schemas/Opportunity' },
              },
            },
            required: ['opportunities'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The planning was created successfully',
    schema: {
      type: 'object',
      properties: {
        planning: { $ref: '#/components/schemas/Planning' },
        pdfUrl: { type: 'string' },
        icsUrl: { type: 'string' },
      },
    },
  })
  @Post('create-planning')
  async createPlanningHandler(@Body() body: { opportunities: Opportunity[] }) {
    const output = await this.createPlanning.execute({ opportunities: body.opportunities });
    return {
      planning: output.planning,
      pdfUrl: output.pdfUrl,
      icsUrl: output.icsUrl,
    };
  }
}
