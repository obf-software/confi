import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTag } from 'src/application/create-tag';
import { Tag } from 'src/domain/tag';

@ApiTags('Tags')
@Controller('api/v0/tags')
export class TagsController {
  constructor(private readonly createTag: CreateTag) {}

  @ApiOperation({
    summary: 'Create a new tag',
    description: 'Create a new tag or update an existing tag if its slug already exists',
  })
  @ApiResponse({
    status: 200,
    description: 'The tag was created or updated successfully',
    type: Tag,
  })
  @Post()
  async createTagHandler(@Body() body: { slug: string; description: string }) {
    const output = await this.createTag.execute({ slug: body.slug, description: body.description });
    return output.tag;
  }
}
