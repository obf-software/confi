import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanning } from 'src/application/create-planning';
import { FindOpportunities } from 'src/application/find-opportunities';
import { ListPlannings } from 'src/application/list-plannings';
import { Opportunity } from 'src/domain/opportunity';
import { Planning } from 'src/domain/planning';

@ApiTags('Actions')
@Controller('api/v0/actions')
export class ActionsController {
  constructor(
    private readonly findOpportunities: FindOpportunities,
    private readonly createPlanning: CreatePlanning,
    private readonly listPlannings: ListPlannings
  ) {}

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
  async findOpportunitiesHandler(@Body() body: Record<string, unknown> = {}) {
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
              opportunitiesIds: {
                type: 'array',
                items: { type: 'string' },
              },
            },
            required: ['opportunitiesIds'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The planning was created successfully',
    type: Planning,
  })
  @Post('create-planning')
  async createPlanningHandler(@Body() body: { opportunitiesIds: string[]; title: string }) {
    const output = await this.createPlanning.execute({
      opportunitiesIds: body.opportunitiesIds,
      title: body.title,
    });
    return output.planning;
  }

  @ApiOperation({
    summary: 'List plannings',
    description: 'List all plannings',
  })
  @ApiResponse({
    status: 200,
    description: 'The plannings were listed successfully',
  })
  @Post('list-plannings')
  async listPlanningsHandler() {
    const output = await this.listPlannings.execute({});
    return output.plannings;
  }
}
