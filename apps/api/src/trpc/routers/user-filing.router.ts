import { Injectable } from '@nestjs/common';
import { UserFilingService } from '../../user-filing/user-filing.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';

@Injectable()
export class UserFilingRouter {
  constructor(
    private readonly userFilingService: UserFilingService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    findUserFilingOrderByLastOpen: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string().uuid(),
          limit: z.number().int().min(0).optional(),
        }),
      )
      .query(async ({ input }) => {
        return await this.userFilingService.findUserFilingOrderByLastOpen(
          input.userId,
          input.limit,
        );
      }),
    userOpenFiling: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string().uuid(),
          filingId: z.string().uuid(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.userFilingService.userOpenFiling(
          input.userId,
          input.filingId,
        );
      }),
  });
}
