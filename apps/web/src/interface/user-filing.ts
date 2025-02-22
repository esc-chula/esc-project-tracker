import { User } from './user';
import { Filing } from './filing';
export interface UserFiling {
  userId: string;
  filing: Filing;
  lastOpen: string;
}
