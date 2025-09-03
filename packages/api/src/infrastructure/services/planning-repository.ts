import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Planning } from 'src/domain/planning';

import { PlanningDbModel } from '../database/planning-db-model';

export interface PlanningRepository {
  save(planning: Planning): Promise<void>;
  get(id: string): Promise<Planning | undefined>;
  list(): Promise<Planning[]>;
  update(planning: Planning): Promise<void>;
}

export const PlanningRepository = Symbol('PlanningRepository');

@Injectable()
export class PlanningRepositoryDb implements PlanningRepository {
  constructor(@Inject(MongoClient) private readonly mongoClient: MongoClient) {}

  private get collection() {
    return this.mongoClient.db().collection<PlanningDbModel>('plannings');
  }

  private mapToDomain(opportunity: PlanningDbModel): Planning {
    return Planning.with({
      id: opportunity._id.toHexString(),
      title: opportunity.title,
      userId: opportunity.userId.toHexString(),
      opportunityIds: opportunity.opportunityIds.map((id) => id.toHexString()),
      pdfFileUrl: opportunity.pdfFileUrl,
      icsFileUrl: opportunity.icsFileUrl,
      status: opportunity.status,
      createdAt: opportunity.createdAt,
      updatedAt: opportunity.updatedAt,
    });
  }

  private mapToDbModel(opportunity: Planning): PlanningDbModel {
    return {
      _id: new ObjectId(opportunity.id),
      title: opportunity.title,
      userId: new ObjectId(opportunity.userId),
      opportunityIds: opportunity.opportunityIds.map((id) => new ObjectId(id)),
      pdfFileUrl: opportunity.pdfFileUrl,
      icsFileUrl: opportunity.icsFileUrl,
      status: opportunity.status,
      createdAt: opportunity.createdAt,
      updatedAt: opportunity.updatedAt,
    };
  }

  async save(opportunity: Planning): Promise<void> {
    const opportunityDbModel = this.mapToDbModel(opportunity);
    await this.collection.insertOne(opportunityDbModel, { ignoreUndefined: true });
  }

  async get(id: string): Promise<Planning | undefined> {
    const planning = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!planning) return undefined;
    return this.mapToDomain(planning);
  }

  async list(): Promise<Planning[]> {
    const plannings = await this.collection.find({}).toArray();
    return plannings.map((p) => this.mapToDomain(p));
  }

  async update(planning: Planning): Promise<void> {
    const planningDbModel = this.mapToDbModel(planning);
    await this.collection.updateOne(
      { _id: new ObjectId(planning.id) },
      { $set: planningDbModel },
      { ignoreUndefined: true }
    );
  }
}
