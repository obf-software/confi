import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Opportunity } from 'src/domain/opportunity';

import { OpportunityDbModel } from '../database/opportunity-db-model';

export interface OpportunityRepository {
  save(opportunity: Opportunity): Promise<void>;
  clear(): Promise<void>;
  findByTags(tags: string[]): Promise<Opportunity[]>;
  findByIds(ids: string[]): Promise<Opportunity[]>;
}

export const OpportunityRepository = Symbol('OpportunityRepository');

@Injectable()
export class OpportunityRepositoryDb implements OpportunityRepository {
  constructor(@Inject(MongoClient) private readonly mongoClient: MongoClient) {}

  private get collection() {
    return this.mongoClient.db().collection<OpportunityDbModel>('opportunities');
  }

  private mapToDomain(opportunity: OpportunityDbModel): Opportunity {
    return Opportunity.with({
      id: opportunity._id.toHexString(),
      name: opportunity.name,
      description: opportunity.description,
      benefits: opportunity.benefits,
      requirements: opportunity.requirements,
      enrollmentDeadline: opportunity.enrollmentDeadline,
      preparationTime: opportunity.preparationTime,
      requiredDocumentation: opportunity.requiredDocumentation,
      link: opportunity.link,
      tags: opportunity.tags,
      searchId: opportunity.searchId?.toHexString() ?? null,
      status: opportunity.status ?? 'DISABLED',
      createdAt: opportunity.createdAt,
      updatedAt: opportunity.updatedAt,
    });
  }

  private mapToDbModel(opportunity: Opportunity): OpportunityDbModel {
    return {
      _id: new ObjectId(opportunity.id),
      name: opportunity.name,
      description: opportunity.description,
      benefits: opportunity.benefits,
      requirements: opportunity.requirements,
      enrollmentDeadline: opportunity.enrollmentDeadline,
      preparationTime: opportunity.preparationTime,
      requiredDocumentation: opportunity.requiredDocumentation,
      link: opportunity.link,
      tags: opportunity.tags,
      searchId: opportunity.searchId ? new ObjectId(opportunity.searchId) : null,
      status: opportunity.status,
      createdAt: opportunity.createdAt,
      updatedAt: opportunity.updatedAt,
    };
  }

  async save(opportunity: Opportunity): Promise<void> {
    const opportunityDbModel = this.mapToDbModel(opportunity);
    await this.collection.insertOne(opportunityDbModel, { ignoreUndefined: true });
  }

  async clear(): Promise<void> {
    await this.collection.deleteMany({});
  }

  async findByTags(tags: string[]): Promise<Opportunity[]> {
    if (tags.length === 0) return [];
    const opportunities = await this.collection.find({ tags: { $in: tags } }).toArray();
    return opportunities.map((o) => this.mapToDomain(o));
  }

  async findByIds(ids: string[]): Promise<Opportunity[]> {
    const validIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
    if (validIds.length === 0) return [];

    const opportunities = await this.collection.find({ _id: { $in: validIds } }).toArray();
    return opportunities.map((o) => this.mapToDomain(o));
  }
}
