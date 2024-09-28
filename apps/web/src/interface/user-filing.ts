import { User } from './user';
import { FilingType } from './filing';
export interface UserFiling {
  userId: string;
  filing: FilingType;
  lastOpen: string;
}
