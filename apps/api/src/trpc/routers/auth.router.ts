import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly authService: AuthService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    signin: this.trpcService.trpc.procedure
      .input(
        z.object({
          token: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.signIn(input.token);
      }),
    validateToken: this.trpcService.trpc.procedure
      .input(
        z.object({
          accessToken: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.validateJWT(input.accessToken);
      }),
    refreshToken: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string(),
          refreshToken: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.refreshToken(input.userId, input.refreshToken);
      }),
    signOut: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.signOut(input.userId);
      }),
  });
}
