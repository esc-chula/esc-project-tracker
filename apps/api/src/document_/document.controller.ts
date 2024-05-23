import { Controller, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('findByProjID/:docID')
  findByProjectID(@Param('docID') docID: string) {
    return this.documentService.findByProjectID(docID);
  }

  @Get('findByUserID/:userID')
  findByUserID(@Param('userID') userID: string) {
    return this.documentService.findByUserID(userID);
  }
}
