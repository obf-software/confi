import { S3Client } from '@aws-sdk/client-s3';
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const s3Factory: FactoryProvider = {
  provide: S3Client,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const region = configService.getOrThrow<string>('AWS_REGION');
    const accessKeyId = configService.getOrThrow<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY');

    return new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  },
};
