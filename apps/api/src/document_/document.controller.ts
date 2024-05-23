import { Controller, Get, Param } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('getByProjID/:docID')
  getByProjectID(@Param('docID') docID: string) {
    return this.documentService.getByProjectID(docID);
  }

  @Get('getByUserID/:userID')
  getByUserID(@Param('userID') userID: string) {
    return this.documentService.getByUserID(userID);
  }
}
