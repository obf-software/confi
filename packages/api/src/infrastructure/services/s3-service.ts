import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface S3Service {
  uploadFile(key: string, content: string | Buffer, contentType: string): Promise<string>;
}

export const S3Service = Symbol('S3Service');

@Injectable()
export class S3ServiceAws implements S3Service {
  private readonly logger = new Logger(S3ServiceAws.name);
  private readonly bucketName: string;

  constructor(
    @Inject(S3Client) private readonly s3Client: S3Client,
    private readonly configService: ConfigService
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(key: string, content: string | Buffer, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: content,
        ContentType: contentType,
      });

      await this.s3Client.send(command);

      const fileUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;

      this.logger.log(`File uploaded successfully to S3: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error(`Failed to upload file to S3: ${String(error)}`);
      throw new Error(`Failed to upload file to S3: ${String(error)}`);
    }
  }
}
