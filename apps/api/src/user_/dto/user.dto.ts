import { AuthRole } from '@repo/shared';

export class CreateUserDTO {
  username: string;
  studentId: string;
}

export class UpdateUserDTO {
  username?: string;
  studentId?: string;
  role?: AuthRole;
  refreshToken?: string;
  tel?: string;
}
