import { Controller } from '@nestjs/common';

@Controller('document')
export class DocumentController {
  name: string;

  Code: string;

  projectCode: string;

  type: number;

  detail: string;

  pdfLink: string;

  docLink: string;

  projectID: string;
}
