import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  private readonly s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS,
      secretAccessKey: process.env.SECRET_KEY,
    },
    endpoint: process.env.ENDPOINT,
    forcePathStyle: true,
  });

  constructor() {}

  async uploadFileToS3(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'project-tracker',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
