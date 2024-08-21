export class CreateUserDTO {
  username: string;
  studentId: string;
}

export class UpdateUserDTO {
  username?: string;
  studentId?: string;
  role?: 'student' | 'esc' | 'admin';
  refreshToken?: string;
}
