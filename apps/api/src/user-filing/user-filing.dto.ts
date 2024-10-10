import { Filing } from '../entities/filing.entity';

export class UserFilingDTO {
  userId: string;
  filing: Filing;
  lastOpen: Date;
}
