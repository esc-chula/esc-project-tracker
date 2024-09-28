import { User } from './user';
import { FilingType } from './filing';
export interface UserFiling {
    user: User;
    filing: FilingType;
    lastOpen: string;
}