export interface User {
  id: string;
  username: string;
  studentId: string;
  role: 'student' | 'esc' | 'admin';
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}
