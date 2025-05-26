import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface PlanningProps {
  id: string;
  content: string;
  pdfUrl: string;
  icsUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Planning {
  @ApiProperty({
    description: 'The ID of the planning',
    example: '000000000000000000000000',
  })
  id: string;

  @ApiProperty({
    description: 'The planning content text',
    example: 'PLANEJAMENTO DE INSCRIÇÃO - OPORTUNIDADES INTERNACIONAIS DE FUNDING...',
  })
  content: string;

  @ApiProperty({
    description: 'The URL to the PDF file in S3',
    example: 'https://bucket.s3.amazonaws.com/planning-123.pdf',
  })
  pdfUrl: string;

  @ApiProperty({
    description: 'The URL to the ICS file in S3',
    example: 'https://bucket.s3.amazonaws.com/planning-123.ics',
  })
  icsUrl: string;

  @ApiProperty({
    description: 'The date and time the planning was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the planning was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  private constructor(props: PlanningProps) {
    this.id = props.id;
    this.content = props.content;
    this.pdfUrl = props.pdfUrl;
    this.icsUrl = props.icsUrl;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static readonly with = (props: PlanningProps) => new Planning(props);

  static readonly create = (props: Omit<PlanningProps, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = dayjs().utc().toDate();
    const id = new ObjectId().toHexString();

    return new Planning({
      id,
      content: props.content,
      pdfUrl: props.pdfUrl,
      icsUrl: props.icsUrl,
      createdAt: now,
      updatedAt: now,
    });
  };
}