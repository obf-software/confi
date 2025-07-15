import { S3Client } from '@aws-sdk/client-s3';
import { FactoryProvider } from '@nestjs/common';

export const s3ClientFactory: FactoryProvider = {
  provide: S3Client,
  useFactory: () => {
    return new S3Client({});
  },
};
