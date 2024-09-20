import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/auth.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { JwtPayload } from '../common/types/auth';

interface UserRequest extends Request {
  user?: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: SignInDTO) {
    return this.authService.signIn(data.token);
  }

  @Post('jwt/validate')
  async validateToken(@Body() data: { accessToken: string }) {
    return this.authService.validateJWT(data.accessToken);
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
  refreshToken(
    @Req() req: UserRequest,
    @Body() data: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshToken(data.userId, data.refreshToken);
  }
}
