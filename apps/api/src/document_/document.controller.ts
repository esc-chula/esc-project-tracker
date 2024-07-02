import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDTO } from './document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/findByProjID/:ProjID')
  findByProjectID(@Param('ProjID') ProjID: string) {
    return this.documentService.findByProjectID(ProjID);
  }

  @Get('/findByUserID/:userID')
  findByUserID(@Param('userID') userID: string) {
    return this.documentService.findByUserID(userID);
  }

  @Post('/create')
  createDocument(@Body() obj: CreateDocumentDTO) {
    return this.documentService.createDocument(obj);
  }
}
