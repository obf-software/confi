import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';

dayjs.extend(utc);

interface TagProps {
  id: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Tag {
  @ApiProperty({
    description: 'The ID of the tag',
    example: '000000000000000000000000',
  })
  id: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'tag-slug',
  })
  slug: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'This is a tag description',
  })
  description: string;

  @ApiProperty({
    description: 'The date and time the tag was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the tag was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  private constructor(props: TagProps) {
    this.id = props.id;
    this.slug = props.slug;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static readonly with = (props: TagProps) => new Tag(props);

  static readonly create = (props: Pick<TagProps, 'slug' | 'description'>) => {
    const id = new ObjectId().toHexString();
    const now = dayjs().utc().toDate();

    const { success, data: slug } = z
      .string()
      .min(1)
      .regex(/^[a-zA-Z0-9-]+$/)
      .safeParse(props.slug);

    if (!success) {
      throw new Error('Invalid tag slug');
    }

    return new Tag({
      id,
      slug,
      description: props.description,
      createdAt: now,
      updatedAt: now,
    });
  };
}
