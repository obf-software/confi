import { ObjectId } from 'bson';

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
  createdAt: Date;
  updatedAt: Date;
}
