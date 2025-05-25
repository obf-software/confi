import { Inject, Injectable } from '@nestjs/common';
import { Opportunity } from 'src/domain/opportunity';
import { OpportunityRepository } from 'src/infrastructure/services/opportunity-repository';
import { OpportunitySource } from 'src/infrastructure/services/opportunity-source';
import { OpportunityTransformer } from 'src/infrastructure/services/opportunity-transformer';
import { TagRepository } from 'src/infrastructure/services/tag-repository';

/**
 * 1. Stract opportunities from the source (unstructured input json)
 * 2. Transform into structured opportunities (domain)
 * 3. Infer tags from the opportunities
 * 4. Save opportunities to the database
 * 5. Return the opportunities
 */
@Injectable()
export class LoadOpportunities {
  constructor(
    @Inject(OpportunitySource) private readonly opportunitySource: OpportunitySource,
    @Inject(OpportunityTransformer) private readonly opportunityTransformer: OpportunityTransformer,
    @Inject(OpportunityRepository) private readonly opportunityRepository: OpportunityRepository,
    @Inject(TagRepository) private readonly tagRepository: TagRepository
  ) {}

  async execute(): Promise<Output> {
    const rawOpportunities = await this.opportunitySource.retrieve();
    const availableTags = await this.tagRepository.findAll();
    await this.opportunityRepository.clear();
    const opportunitiesIterator = this.opportunityTransformer.transform(
      rawOpportunities,
      availableTags
    );
    const opportunities: Opportunity[] = [];

    for await (const opportunity of opportunitiesIterator) {
      await this.opportunityRepository.save(opportunity);
      opportunities.push(opportunity);
    }

    return { opportunities };
  }
}

export interface Output {
  opportunities: Opportunity[];
}
