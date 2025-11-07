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
      .meta({ route: { tags: ['Authentication'], summary: 'Sign in with Intania Auth token' } })
      .input(
        z.object({
          token: z.string(),
        }),
      )
      .mutation(({ input }) => {
        return this.authService.signIn(input.token);
      }),
    validateToken: this.trpcService.trpc.procedure
      .meta({ route: { tags: ['Authentication'], summary: 'Validate JWT access token' } })
      .input(
        z.object({
          accessToken: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.validateJWT(input.accessToken);
      }),
    refreshToken: this.trpcService.trpc.procedure
      .meta({ route: { tags: ['Authentication'], summary: 'Refresh access token' } })
      .input(
        z.object({
          userId: z.string().uuid(),
          refreshToken: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.refreshToken(input.userId, input.refreshToken);
      }),
    signOut: this.trpcService.trpc.procedure
      .meta({ route: { tags: ['Authentication'], summary: 'Sign out user' } })
      .input(
        z.object({
          accessToken: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.authService.signOut(input.accessToken);
      }),
  });
}
