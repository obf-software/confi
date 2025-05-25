import { Inject, Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(LoadOpportunities.name);

  constructor(
    @Inject(OpportunitySource) private readonly opportunitySource: OpportunitySource,
    @Inject(OpportunityTransformer) private readonly opportunityTransformer: OpportunityTransformer,
    @Inject(OpportunityRepository) private readonly opportunityRepository: OpportunityRepository,
    @Inject(TagRepository) private readonly tagRepository: TagRepository
  ) {}

  async execute(): Promise<Output> {
    this.logger.log('Loading opportunities');

    const [rawOpportunities, availableTags] = await Promise.all([
      this.opportunitySource.retrieve(),
      this.tagRepository.findAll(),
    ]);

    this.logger.log(`Found ${rawOpportunities.length.toString()} opportunities`);
    this.logger.log(
      `Found ${availableTags.length.toString()} tags: ${availableTags.map((t) => t.slug).join(', ')}`
    );

    await this.opportunityRepository.clear();
    const opportunitiesIterator = this.opportunityTransformer.transform(
      rawOpportunities,
      availableTags
    );
    const opportunities: Opportunity[] = [];

    for await (const opportunity of opportunitiesIterator) {
      if (opportunity.tags.length === 0) {
        this.logger.warn(`Saving opportunity: ${opportunity.name} without tags`);
      } else {
        this.logger.log(
          `Saving opportunity: ${opportunity.name} (tags=[${opportunity.tags.join(', ')}])`
        );
      }

      await this.opportunityRepository.save(opportunity);
      opportunities.push(opportunity);
    }

    const nOpportunities = opportunities.length.toString();
    const nOpportunitiesWithoutTags = opportunities
      .filter((o) => o.tags.length === 0)
      .length.toString();
    const nOpportunitiesWithTags = opportunities.filter((o) => o.tags.length > 0).length.toString();

    this.logger.log(
      `Loaded ${nOpportunities} opportunities (${nOpportunitiesWithoutTags} without tags, ${nOpportunitiesWithTags} with tags)`
    );

    return { opportunities };
  }
}

export interface Output {
  opportunities: Opportunity[];
}
