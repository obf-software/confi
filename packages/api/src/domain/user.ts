import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export type UserRole = 'ADMIN' | 'USER';

interface UserProps {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  position: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  @ApiProperty({
    description: 'The ID of the user',
    example: '000000000000000000000000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  phone: string | null;

  @ApiProperty({
    description: 'The organization of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  organization: string | null;

  @ApiProperty({
    description: 'The position of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  position: string | null;

  @ApiProperty({
    description: 'The role of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  role: UserRole;

  @ApiProperty({
    description: 'The date and time the user was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the user was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.organization = props.organization;
    this.position = props.position;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static readonly with = (props: UserProps) => new User(props);

  static readonly create = (
    props: Pick<UserProps, 'name' | 'email' | 'phone' | 'organization' | 'position' | 'role'>
  ) => {
    const id = new ObjectId().toHexString();
    const now = dayjs().utc().toDate();

    return new User({
      id,
      name: props.name,
      email: props.email,
      phone: props.phone,
      organization: props.organization,
      position: props.position,
      role: props.role,
      createdAt: now,
      updatedAt: now,
    });
  };
}
