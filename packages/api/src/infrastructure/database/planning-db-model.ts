import { ObjectId } from 'bson';

export type PlanningStatusDbModel = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface PlanningDbModel {
  _id: ObjectId;
  title: string;
  userId: ObjectId;
  opportunityIds: ObjectId[];
  pdfFileUrl: string | null;
  icsFileUrl: string | null;
  status: PlanningStatusDbModel;
  createdAt: Date;
  updatedAt: Date;
}
