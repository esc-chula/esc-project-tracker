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
  });
}
