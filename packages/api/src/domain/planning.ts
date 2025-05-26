import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';

interface PlanningProps {
  id: string;
  pdfUrl: string;
  icsUrl: string;
}

export class Planning {
  @ApiProperty({
    description: 'The ID of the planning',
    example: '000000000000000000000000',
  })
  id: string;

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

  private constructor(props: PlanningProps) {
    this.id = props.id;
    this.pdfUrl = props.pdfUrl;
    this.icsUrl = props.icsUrl;
  }

  static readonly with = (props: PlanningProps) => new Planning(props);

  static readonly create = (props: Omit<PlanningProps, 'id'>) => {
    const id = new ObjectId().toHexString();

    return new Planning({
      id,
      pdfUrl: props.pdfUrl,
      icsUrl: props.icsUrl,
    });
  };
}
