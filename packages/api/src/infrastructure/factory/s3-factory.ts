import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Factory: FactoryProvider = {
  provide: S3Client,
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const region = configService.getOrThrow('AWS_REGION') as string;
    const accessKeyId = configService.getOrThrow('AWS_ACCESS_KEY_ID') as string;
    const secretAccessKey = configService.getOrThrow('AWS_SECRET_ACCESS_KEY') as string;
    
    return new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  },
};