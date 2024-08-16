import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

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

  async uploadFileToS3(fileName: string, file: Buffer, folderName?: string) {
    const currentDate = new Date();
    const dateWithTimestamp = currentDate.toISOString();
    let storedName = `{${dateWithTimestamp}}-` + fileName;
    if (folderName) storedName = folderName + '/' + storedName;
    return await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'project-tracker',
        Key: storedName,
        Body: file,
      }),
    );
  }

  async getUrltoFile(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: 'project-tracker',
      Key: fileName,
    });

    console.log(command);

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return url;
  }
}
