import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type PlanningStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

interface PlanningProps {
  id: string;
  title: string;
  userId: string;
  opportunityIds: string[];
  pdfFileUrl: string | null;
  icsFileUrl: string | null;
  status: PlanningStatus;
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
    description: 'The title of the planning',
    example: 'Planning Title',
  })
  title: string;

  @ApiProperty({
    description: 'The ID of the user',
    example: '000000000000000000000000',
  })
  userId: string;

  @ApiProperty({
    description: 'The IDs of the opportunities',
    example: ['000000000000000000000000', '000000000000000000000001'],
  })
  opportunityIds: string[];

  @ApiProperty({
    description: 'The ID of the PDF file in S3',
    example: '000000000000000000000000',
  })
  pdfFileUrl: string | null;

  @ApiProperty({
    description: 'The ID of the ICS file in S3',
    example: '000000000000000000000000',
  })
  icsFileUrl: string | null;

  @ApiProperty({
    description: 'The status of the planning',
    example: 'IN_PROGRESS',
  })
  status: PlanningStatus;

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
    this.title = props.title;
    this.userId = props.userId;
    this.opportunityIds = props.opportunityIds;
    this.pdfFileUrl = props.pdfFileUrl;
    this.icsFileUrl = props.icsFileUrl;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static readonly with = (props: PlanningProps) => new Planning(props);

  static readonly create = (props: Pick<PlanningProps, 'title' | 'opportunityIds'>) => {
    const id = new ObjectId().toHexString();
    const now = dayjs().utc().toDate();

    return new Planning({
      id,
      title: props.title,
      userId: new ObjectId().toHexString(),
      opportunityIds: props.opportunityIds,
      pdfFileUrl: null,
      icsFileUrl: null,
      status: 'IN_PROGRESS',
      createdAt: now,
      updatedAt: now,
    });
  };

  setPdfFileUrl(pdfFileUrl: string) {
    this.pdfFileUrl = pdfFileUrl;
    this.updatedAt = dayjs().utc().toDate();
  }

  setIcsFileUrl(icsFileUrl: string) {
    this.icsFileUrl = icsFileUrl;
    this.updatedAt = dayjs().utc().toDate();
  }
}
