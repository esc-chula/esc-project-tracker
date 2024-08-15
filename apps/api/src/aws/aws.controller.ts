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
  ) {
    return await this.awsService.uploadFileToS3(
      file.originalname,
      file.buffer,
      folderName,
    );
  }
}
