import { AuthRole } from '..';

export interface JwtPayload {
  sub: string;
  username: string;
  role: AuthRole;
  iat: number;
  exp: number;
}

export interface Payload extends JwtPayload {}

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

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
