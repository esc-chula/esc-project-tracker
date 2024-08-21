import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/auth.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

interface UserRequest extends Request {
  user?: {
    sub: string;
    refreshToken?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() data: SignInDTO) {
    return this.authService.signIn(data.studentId, data.username);
  }

  @UseGuards(AccessTokenGuard)
  @Post('signout')
  signOut(@Req() req: UserRequest) {
    return this.authService.signOut(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  me(@Req() req: UserRequest) {
    return this.authService.me(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshToken(@Req() req: UserRequest) {
    return this.authService.refreshToken(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }
}
