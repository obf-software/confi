import { Inject, Injectable } from '@nestjs/common';
import { Tag } from 'src/domain/tag';
import { TagRepository } from 'src/infrastructure/services/tag-repository';

@Injectable()
export class CreateTag {
  constructor(@Inject(TagRepository) private readonly tagRepository: TagRepository) {}

  async execute(input: Input): Promise<Output> {
    const tag = Tag.create({ slug: input.slug, description: input.description });
    await this.tagRepository.save(tag);
    return { tag };
  }
}

export interface Input {
  slug: string;
  description: string;
}

export interface Output {
  tag: Tag;
}
