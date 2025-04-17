import type { AuthRole } from '@repo/shared';

export interface User {
  id: string;
  username: string;
  studentId: string;
  role: AuthRole;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
  tel?: string;
}
