import { Controller } from '@nestjs/common';
import { DocStatus } from '../constant/enum';

@Controller('document')
export class DocumentController {
  name: string;

  Code: string;

  status: DocStatus;

  projectCode: string;

  type: number;

  detail: string;

  pdfLink: string;

  docLink: string;

  projectID: string;
}
