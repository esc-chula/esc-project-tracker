import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user_/user.service';
import * as argon2 from 'argon2';
import { User } from '../entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { IntaniaAuthResponse } from '../common/types/auth';

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
      const validatedUser = this.httpService.axiosRef
        .post(
          'https://account.intania.org/api/v1/auth/app/validate',
          { token },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'INTANIA_AUTH_SECRET',
              )}`,
            },
          },
        )
        .then((response) => {
          return response.data.data as IntaniaAuthResponse;
        });

      return validatedUser;
    } catch (error) {
      throw new Error("Request failed when validating user's token");
    }
  }

  async signIn(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

    const tokens = await this.getTokens(createdUser.id, username);
    await this.updateRefreshToken(createdUser.id, tokens.refreshToken);
    return tokens;
  }

  async signOut(userId: string) {
    await this.userService.update(userId, { refreshToken: null });
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
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
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
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
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
}
