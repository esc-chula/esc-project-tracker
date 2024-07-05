import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  private readonly s3Client = new S3Client({
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: process.env.access,
      secretAccessKey: process.env.secret_key,
    },
    endpoint: 's3.intania.org',
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
    // console.log(fileName);
    // console.log(file);
  }
}
