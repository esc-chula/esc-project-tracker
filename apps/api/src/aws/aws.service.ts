import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

  async getUrlToFile(fileName: string, folderName?: string): Promise<string> {
    const isPdf = fileName.slice(-4) == '.pdf';
    const bucketName = 'project-tracker';
    const pathToFile = folderName ? `${folderName}/${fileName}` : fileName;
    let command: GetObjectCommand;
    if (isPdf) {
      command = new GetObjectCommand({
        Bucket: bucketName,
        Key: pathToFile,
        ResponseContentDisposition: 'inline', // Force the PDF to be displayed in the browser
        ResponseContentType: 'application/pdf', // Ensure it's treated as a PDF
      });
    } else {
      command = new GetObjectCommand({
        Bucket: bucketName,
        Key: pathToFile,
        ResponseContentDisposition: 'inline', // Force the PDF to be displayed in the browser
        ResponseContentType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Ensure it's treated as a PDF
      });
    }

    try {
      // Generate signed URL for file
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      }); // URL valid for 1 hour
      return signedUrl;
    } catch (err) {
      throw new Error(`Error generating URL for file: ${err.message}`);
    }
  }
}
