export interface JwtPayload {
  sub: string;
  username: string;
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
