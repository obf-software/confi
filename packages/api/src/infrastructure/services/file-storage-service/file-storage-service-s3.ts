import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { FileStorageService } from './file-storage-service';

dayjs.extend(utc);

@Injectable()
export class FileStorageServiceS3 implements FileStorageService {
  private readonly logger = new Logger(FileStorageServiceS3.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(readonly configService: ConfigService) {
    const region = configService.getOrThrow<string>('AWS_REGION');
    const accessKeyId = configService.getOrThrow<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY');

    this.s3Client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });

    this.bucketName = configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  private generateUniqueKey(extension: string): string {
    const now = dayjs().utc();
    const year = now.year().toString();
    const month = (now.month() + 1).toString().padStart(2, '0');
    const day = now.date().toString().padStart(2, '0');
    const incrementalId = new ObjectId().toString();

    return `${year}/${month}/${day}/${incrementalId}.${extension}`;
  }

  async upload(input: FileStorageService.Upload.Input): Promise<FileStorageService.Upload.Output> {
    const key = this.generateUniqueKey(input.extension);
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: input.content,
      ContentType: input.contentType,
    });

    await this.s3Client.send(command);

    return {
      fileInfo: {
        key,
        bucket: this.bucketName,
        contentType: input.contentType,
      },
    };
  }

  async getFileDownloadUrl(
    input: FileStorageService.GetFileDownloadUrl.Input
  ): Promise<FileStorageService.GetFileDownloadUrl.Output> {
    const command = new GetObjectCommand({
      Bucket: input.fileInfo.bucket,
      Key: input.fileInfo.key,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 60 * 60 * 24 });

    return {
      url: presignedUrl,
    };
  }
}
