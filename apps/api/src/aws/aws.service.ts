import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import truncateTextByBytes from '../common/utils/truncateTextByBytes';

@Injectable()
export class AwsService {
  private readonly s3Client = new S3Client({
    region: process.env.REGION ?? '',
    credentials: {
      accessKeyId: process.env.ACCESS ?? '',
      secretAccessKey: process.env.SECRET_KEY ?? '',
    },
    endpoint: process.env.ENDPOINT ?? '',
    forcePathStyle: true,
  });

  constructor() {}

  async uploadFileToS3(fileName: string, file: Buffer, folderName?: string) {
    const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
    const currentDate = new Date();
    const dateWithTimestamp = currentDate.toISOString();
    const fileType = '.' + fileName.split('.').pop();

    if (file.byteLength > MAX_UPLOAD_SIZE) throw new Error('ไฟล์ใหญ่เกิน 10MB');

    // '{2024-09-05T16:19:34.142Z}-' has 27 characters
    const truncatedFileName = truncateTextByBytes(
      fileName.slice(0, -fileType.length),
      255 - fileType.length - 27,
    );

    let storedFileName =
      `{${dateWithTimestamp}}-` + truncatedFileName + fileType;
    const newFileName = storedFileName;
    if (folderName) storedFileName = folderName + '/' + storedFileName;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: storedFileName,
          Body: file,
        }),
      );
    } catch (e) {
      console.log(e);
      throw new Error('Cannot Upload to S3 Bucket');
    }
    return newFileName;
  }

  async getUrlToFile(
    fileName: string,
    folderName?: string,
    isDownload = false,
  ): Promise<string> {
    const isPdf = fileName.slice(-4) == '.pdf';
    const bucketName = process.env.BUCKET_NAME;
    const pathToFile = folderName ? `${folderName}/${fileName}` : fileName;
    let command: GetObjectCommand;
    const extractedFileName = fileName
      .replace(/\{\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\}-/, '')
      .split('.')
      .slice(0, -1)
      .join('.');
    if (isPdf) {
      command = new GetObjectCommand({
        Bucket: bucketName,
        Key: pathToFile,
        ResponseContentDisposition: isDownload
          ? `attachment; filename="${extractedFileName}.pdf"`
          : 'inline', // Force the PDF to be displayed in the browser
        ResponseContentType: 'application/pdf', // Ensure it's treated as a PDF
      });
    } else {
      command = new GetObjectCommand({
        Bucket: bucketName,
        Key: pathToFile,
        ResponseContentDisposition: isDownload
          ? `attachment; filename="${extractedFileName}.docx"`
          : 'inline', // Force the PDF to be displayed in the browser
        ResponseContentType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Ensure it's treated as a .docx
      });
    }

    try {
      // Generate signed URL for file
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      }); // URL valid for 1 hour
      return signedUrl;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Error generating URL for file: ${err.message}`);
      }
      throw new Error(`Error generating URL for file`);
    }
  }
}
