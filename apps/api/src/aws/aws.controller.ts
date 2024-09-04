import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file')) // In body, key's name have to be *"file"*
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body('folderName') folderName: string,
    @Body('fileName') fileName: string,
  ) {
    const uploadedFileName = await this.awsService.uploadFileToS3(
      fileName,
      file.buffer,
      folderName,
    );
    return { statusCode: 201, uploadedFileName };
  }

  @Post('/getUrlToFile')
  async getUrlToFile(@Body() obj: { fileName: string; folderName?: string }) {
    return await this.awsService.getUrlToFile(obj.fileName, obj.folderName);
  }
}
