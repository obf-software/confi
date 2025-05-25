import { ObjectId } from 'bson';

export interface TagDbModel {
  _id: ObjectId;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
