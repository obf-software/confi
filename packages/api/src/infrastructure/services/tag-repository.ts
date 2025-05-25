import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Tag } from 'src/domain/tag';

import { TagDbModel } from '../database/tag-db-model';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findAll(): Promise<Tag[]>;
}

export const TagRepository = Symbol('TagRepository');

@Injectable()
export class TagRepositoryDb implements TagRepository {
  constructor(@Inject(MongoClient) private readonly mongoClient: MongoClient) {}

  private get collection() {
    return this.mongoClient.db().collection<TagDbModel>('tags');
  }

  private mapToDomain(tag: TagDbModel): Tag {
    return Tag.with({
      id: tag._id.toHexString(),
      slug: tag.slug,
      description: tag.description,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    });
  }

  private mapToDbModel(tag: Tag): TagDbModel {
    return {
      _id: new ObjectId(tag.id),
      slug: tag.slug,
      description: tag.description,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
    };
  }

  async save(tag: Tag): Promise<void> {
    const existingTag = await this.collection.findOne({ slug: tag.slug });
    if (existingTag) throw new Error('A tag with this slug already exists');
    await this.collection.insertOne(this.mapToDbModel(tag), { ignoreUndefined: true });
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.collection.find({}).toArray();
    return tags.map((t) => this.mapToDomain(t));
  }
}
