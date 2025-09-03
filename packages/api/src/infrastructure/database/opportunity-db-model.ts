import { ObjectId } from 'bson';

export type OpportunityStatusDbModel = 'ACTIVE' | 'DISABLED' | 'PENDING_REVIEW';

export interface OpportunityDbModel {
  _id: ObjectId;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  enrollmentDeadline: string;
  preparationTime: string;
  requiredDocumentation: string[];
  link: string | null;
  tags: string[];
  searchId?: ObjectId | null;
  status?: OpportunityStatusDbModel;
  createdAt: Date;
  updatedAt: Date;
}
