import { Inject, Injectable, Logger } from '@nestjs/common';
import { Opportunity } from 'src/domain/opportunity';
import { OpportunityRepository } from 'src/infrastructure/services/opportunity-repository';
import { TagRepository } from 'src/infrastructure/services/tag-repository';
import { TagTransformer } from 'src/infrastructure/services/tag-transformer';

/**
 * 1. generate a list of tags based on the form input
 * 2. find opportunities that match the tags
 * 3. return the opportunities
 */
@Injectable()
export class FindOpportunities {
  private readonly logger = new Logger(FindOpportunities.name);

  constructor(
    @Inject(OpportunityRepository) private readonly opportunityRepository: OpportunityRepository,
    @Inject(TagRepository) private readonly tagRepository: TagRepository,
    @Inject(TagTransformer) private readonly tagTransformer: TagTransformer
  ) {}

  async execute(input: Input): Promise<Output> {
    this.logger.debug(`Finding opportunities for input: ${JSON.stringify(input)}`);

    const availableTags = await this.tagRepository.findAll();

    this.logger.debug(
      `Found ${availableTags.length.toString()} available tags: ${availableTags.map((t) => t.slug).join(', ')}`
    );

    const tags = await this.tagTransformer.transform(input.formInput, availableTags);
    const tagSlugs = tags.map((t) => t.slug);

    this.logger.debug(`Inferred ${tagSlugs.length.toString()} tags: ${tagSlugs.join(', ')}`);

    if (tagSlugs.length === 0) return { opportunities: [] };

    const opportunities = await this.opportunityRepository.findByTags(tagSlugs);

    this.logger.debug(`Found ${opportunities.length.toString()} opportunities`);

    return { opportunities };
  }
}

export interface Input {
  formInput: Record<string, unknown>;
}

export interface Output {
  opportunities: Opportunity[];
}
