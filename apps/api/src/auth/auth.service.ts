import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user_/user.service';
import * as argon2 from 'argon2';
import { User } from '../entities/user.entity';
import { HttpService } from '@nestjs/axios';
import type { IntaniaAuthResponse, JwtPayload, Tokens } from '@repo/shared';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async validateUser(token: string): Promise<IntaniaAuthResponse> {
    try {
      const validatedResponse = await this.httpService.axiosRef.post(
        'https://account.intania.org/api/v1/auth/app/validate',
        { token },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'INTANIA_AUTH_SECRET',
            )}`,
          },
        },
      );

      return validatedResponse.data.data as IntaniaAuthResponse;
    } catch (error) {
      console.log('Error validating user:', error);

      throw new Error("Request failed when validating user's token");
    }
  }

  async validateJWT(token: string): Promise<JwtPayload> {
    try {
      const validatedUser = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return validatedUser;
    } catch (error) {
      throw new ForbiddenException('Invalid JWT token');
    }
  }

  async signIn(token: string): Promise<Tokens> {
    const validatedUser = await this.validateUser(token).catch((error) => {
      throw new ForbiddenException(error.message);
    });

    const studentId = validatedUser.studentId;
    let username = `${validatedUser.name.th.firstName} ${validatedUser.name.th.lastName}`;

    const existedUser = await this.userService.findByStudentID(studentId);

    let createdUser: User;

    if (!existedUser) {
      createdUser = await this.userService.createUser({
        studentId,
        username,
      });
    } else {
      createdUser = existedUser;
      username = createdUser.username;
    }

    const tokens = await this.getTokens(
      createdUser.id,
      username,
      createdUser.role,
    );
    await this.updateRefreshToken(createdUser.id, tokens.refreshToken);
    return tokens;
  }

  async signOut(accessToken: string) {
    const payload = await this.validateJWT(accessToken);
    await this.userService.update(payload.sub, { refreshToken: '' });
  }

  async me(userId: string) {
    const user = await this.userService.findByUserID(userId);
    return user;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findByUserID(userId);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!user.refreshToken) {
      throw new ForbiddenException('User does not have refresh token');
    }

    // console.log('Comparing refresh token');
    // console.log('user.refreshToken', user.refreshToken);
    // console.log('refreshToken', refreshToken);

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const tokens = await this.getTokens(user.id, user.username, user.role);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(
    userId: string,
    username: string,
    role: string,
  ): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '14d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  parseJwt(token: string): JwtPayload {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error(error);
      throw new Error('parseJwt Error');
    }
  }
}
