import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @UseGuards(AccessTokenGuard)
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
