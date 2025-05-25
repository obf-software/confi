import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface OpportunityProps {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  enrollmentDeadline: string;
  preparationTime: string;
  requiredDocumentation: string[];
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export class Opportunity {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  enrollmentDeadline: string;
  preparationTime: string;
  requiredDocumentation: string[];
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];

  private constructor(props: OpportunityProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.benefits = props.benefits;
    this.requirements = props.requirements;
    this.enrollmentDeadline = props.enrollmentDeadline;
    this.preparationTime = props.preparationTime;
    this.requiredDocumentation = props.requiredDocumentation;
    this.link = props.link;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.tags = props.tags;
  }

  static readonly with = (props: OpportunityProps) => new Opportunity(props);

  static readonly create = (props: Omit<OpportunityProps, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = dayjs().utc().toDate();
    const id = new ObjectId().toHexString();

    return new Opportunity({
      id,
      name: props.name,
      description: props.description,
      benefits: props.benefits,
      requirements: props.requirements,
      enrollmentDeadline: props.enrollmentDeadline,
      preparationTime: props.preparationTime,
      requiredDocumentation: props.requiredDocumentation,
      link: props.link,
      createdAt: now,
      updatedAt: now,
      tags: props.tags,
    });
  };
}
