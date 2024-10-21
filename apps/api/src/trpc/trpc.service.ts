import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from '../common/context/extractTokens';
import { AuthService } from '../auth/auth.service';
import { FilingService } from '../filing/filing.service';
import { UserProjService } from '../user-proj/user-proj.service';
import { DocumentService } from '../document_/document.service';
import { CookieOptions } from 'express';

@Injectable()
export class TrpcService {
  constructor(
    private readonly authService: AuthService,
    private readonly filingService: FilingService,
    private readonly userProjService: UserProjService,
    private readonly documentService: DocumentService,
  ) {}
  readonly jwtCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  };
  trpc = initTRPC.context<Context>().create();
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
  protectedProcedure = this.trpc.procedure.use(async (opts) => {
    try {
      const { accessToken, refreshToken, res } = opts.ctx;
      if (accessToken) {
        const payload = await this.authService
          .validateJWT(accessToken)
          .catch(() => null);

        if (payload)
          return opts.next({
            ctx: {
              ...opts.ctx,
              payload,
            },
          });
      }

      if (!refreshToken) throw new Error('Refresh Token Missing');

      const payload = this.authService.parseJwt(refreshToken);
      const newTokens = await this.authService
        .refreshToken(payload.sub, refreshToken)
        .catch(() => null);

      if (!newTokens) throw new Error('Error refreshing new token');
      const newPayload = this.authService.parseJwt(newTokens.accessToken);
      res.cookie('accessToken', newTokens.accessToken, this.jwtCookieOptions);
      res.cookie('refreshToken', newTokens.refreshToken, this.jwtCookieOptions);

      return opts.next({
        ctx: {
          ...opts.ctx,
          payload: newPayload,
        },
      });
    } catch (err) {
      if (err instanceof Error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Middleware Error: ' + err.message,
        });

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Middleware Unknown Error',
      });
    }
  });
  adminProcedure = this.protectedProcedure.use(async (opts) => {
    try {
      const { ctx } = opts;
      if (ctx.payload.role !== 'admin')
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Admin Only' });
      return opts.next();
    } catch (err) {
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

  async isProjectMember(
    userId: string,
    id: string,
    idType: 'project' | 'filing' | 'document',
  ) {
    try {
      let projectId = null;
      switch (idType) {
        case 'project':
          projectId = id;
          break;
        case 'filing':
          const filing = await this.filingService.findByFilingID(id);
          if (!filing) throw new Error('Filing not found');
          projectId = filing.projectId;
          break;
        case 'document':
          const doc = await this.documentService.findByDocID(id);
          if (!doc) throw new Error('Document not found');
          const filingByDoc = await this.filingService.findByFilingID(
            doc.filingId,
          );
          if (!filingByDoc) throw new Error('Filing not found');
          projectId = filingByDoc.projectId;
          break;
        default:
          throw new Error('Invalid idType');
      }
      return {
        isMember: await this.userProjService.hasUserProj({
          userId,
          projectId,
        }),
        errMsg: '',
      };
    } catch (err) {
      return {
        isMember: false,
        errMsg: err instanceof Error ? err.message : 'Unknown Error',
      };
    }
  }
}
