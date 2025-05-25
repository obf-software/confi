import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The ID of the opportunity',
    example: '000000000000000000000000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the opportunity',
    example: 'Opportunity Name',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the opportunity',
    example: 'Opportunity Description',
  })
  description: string;

  @ApiProperty({
    description: 'The benefits of the opportunity',
    example: ['Benefit 1', 'Benefit 2'],
  })
  benefits: string[];

  @ApiProperty({
    description: 'The requirements of the opportunity',
    example: ['Requirement 1', 'Requirement 2'],
  })
  requirements: string[];

  @ApiProperty({
    description: 'The enrollment deadline of the opportunity',
    example: '2021-01-01',
  })
  enrollmentDeadline: string;

  @ApiProperty({
    description: 'The preparation time of the opportunity',
    example: '1 week',
  })
  preparationTime: string;

  @ApiProperty({
    description: 'The required documentation of the opportunity',
    example: ['Documentation 1', 'Documentation 2'],
  })
  requiredDocumentation: string[];

  @ApiProperty({
    description: 'The link to the opportunity',
    example: 'https://example.com',
  })
  link: string | null;

  @ApiProperty({
    description: 'The date and time the opportunity was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the opportunity was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The tags of the opportunity',
    example: ['tag1', 'tag2'],
  })
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
