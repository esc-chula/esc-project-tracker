export type AuthRole = 'student' | 'esc' | 'admin';

export interface JwtPayload {
  sub: string;
  username: string;
  role: AuthRole;
  iat: number;
  exp: number;
}

export interface IntaniaAuthResponse {
  studentId: string;
  name: {
    en: {
      firstName: string;
      lastName: string;
    };
    th: {
      firstName: string;
      lastName: string;
    };
  };
}
