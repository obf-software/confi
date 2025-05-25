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
  id: string;
  slug: string;
  description: string;
  createdAt: Date;
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
