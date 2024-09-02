export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Payload {
  sub: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}
