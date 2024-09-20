import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from '../common/context/extractTokens';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../common/types/auth';

@Injectable()
export class TrpcService {
  constructor(private readonly authService: AuthService) {}
  trpc = initTRPC.context<Context>().create();
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
  protectedProcedure = this.trpc.procedure.use(async (opts) => {
    try {
      const { ctx } = opts;
      if (!ctx.accessToken || !ctx.refreshToken)
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Token Missing' });

      const payload: JwtPayload = await this.authService.validateJWT(
        ctx.accessToken,
      );
      return opts.next({
        ctx: {
          ...ctx,
          payload,
        },
      });
    } catch (err) {
      console.log('Middleware Error: ' + err.message);
      if (err instanceof Error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Middleware Error: ' + err.message,
        });
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Middleware Unknown Error',
      });
    }
  });
}
