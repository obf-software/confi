import { Body, Controller, Post } from '@nestjs/common';
import { CreateTag } from 'src/application/create-tag';

@Controller('api/v0/tags')
export class TagsController {
  constructor(private readonly createTag: CreateTag) {}

  @Post()
  createTagHandler(@Body() body: { slug: string; description: string }) {
    return this.createTag.execute({ slug: body.slug, description: body.description });
  }
}
