import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOpportunities } from 'src/application/find-opportunities';
import { LoadOpportunities } from 'src/application/load-opportunities';
import { Opportunity } from 'src/domain/opportunity';

@ApiTags('Actions')
@Controller('api/v0/actions')
export class ActionsController {
  constructor(
    private readonly findOpportunities: FindOpportunities,
    private readonly loadOpportunities: LoadOpportunities
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
}
