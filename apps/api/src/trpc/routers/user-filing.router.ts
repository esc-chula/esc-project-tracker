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
    // Now: Use in admin section only
    findUserFilingOrderByLastOpen: this.trpcService.adminProcedure
      .meta({ route: { tags: ['Users', 'Filings'], summary: 'Get user filings ordered by last open (admin only)' } })
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
    userOpenFiling: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Users', 'Filings'], summary: 'Record user opening a filing' } })
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
