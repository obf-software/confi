import { Body, Controller, Post } from '@nestjs/common';
import { FindOpportunities } from 'src/application/find-opportunities';
import { LoadOpportunities } from 'src/application/load-opportunities';

@Controller('api/v0/actions')
export class ActionsController {
  constructor(
    private readonly findOpportunities: FindOpportunities,
    private readonly loadOpportunities: LoadOpportunities
  ) {}

  @Post('load-opportunities')
  loadOpportunitiesHandler() {
    return this.loadOpportunities.execute();
  }

  @Post('find-opportunities')
  findOpportunitiesHandler(@Body() body: Record<string, unknown>) {
    return this.findOpportunities.execute({ formInput: body });
  }
}
