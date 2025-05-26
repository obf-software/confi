import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Client } from 'minio';

import { FileStorageService } from './file-storage-service';

dayjs.extend(utc);

@Injectable()
export class FileStorageServiceLocal implements FileStorageService {
  private readonly logger = new Logger(FileStorageServiceLocal.name);
  private readonly minioClient: Client;
  private readonly bucketName: string;

  constructor(readonly configService: ConfigService) {
    const endPoint = configService.getOrThrow<string>('MINIO_ENDPOINT');
    const port = parseInt(configService.getOrThrow<string>('MINIO_PORT'), 10);
    const accessKey = configService.getOrThrow<string>('MINIO_ACCESS_KEY');
    const secretKey = configService.getOrThrow<string>('MINIO_SECRET_KEY');

    this.minioClient = new Client({ endPoint, port, accessKey, secretKey, useSSL: false });

    this.bucketName = configService.getOrThrow<string>('MINIO_BUCKET_NAME');

    void this.ensureBucketExists();
  }

  private async ensureBucketExists(): Promise<void> {
    try {
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (bucketExists) return;
      await this.minioClient.makeBucket(this.bucketName);
      this.logger.log(`Created bucket: ${this.bucketName}`);
    } catch (error) {
      this.logger.error(`Error ensuring bucket exists: ${String(error)}`);
    }
  }

  private generateUniqueKey(): string {
    const now = dayjs().utc();
    const year = now.year().toString();
    const month = (now.month() + 1).toString().padStart(2, '0');
    const day = now.date().toString().padStart(2, '0');
    const incrementalId = new ObjectId().toString();

    return `${year}/${month}/${day}/${incrementalId}`;
  }

  async upload(input: FileStorageService.Upload.Input): Promise<FileStorageService.Upload.Output> {
    const key = this.generateUniqueKey();

    try {
      await this.minioClient.putObject(this.bucketName, key, input.content, undefined, {
        'Content-Type': input.contentType,
      });

      this.logger.debug(`File uploaded successfully: ${key}`);

      return {
        fileInfo: {
          key,
          bucket: this.bucketName,
          contentType: input.contentType,
        },
      };
    } catch (error) {
      this.logger.error(`Error uploading file: ${String(error)}`);
      throw new Error(`Failed to upload file: ${String(error)}`);
    }
  }

  async getFileDownloadUrl(
    input: FileStorageService.GetFileDownloadUrl.Input
  ): Promise<FileStorageService.GetFileDownloadUrl.Output> {
    try {
      const url = await this.minioClient.presignedGetObject(
        input.fileInfo.bucket,
        input.fileInfo.key,
        60 * 60 * 24 * 7
      );

      this.logger.debug(`Generated download URL for: ${input.fileInfo.key}`);

      return { url };
    } catch (error) {
      this.logger.error(`Error generating download URL: ${String(error)}`);
      throw new Error(`Failed to generate download URL: ${String(error)}`);
    }
  }
}
