import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { FilingStatus } from '../../constant/enum';
import { FilingService } from '../../filing/filing.service';

@Injectable()
export class FilingRouter {
  constructor(
    private readonly filingService: FilingService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    //Get Filing By ID
    findFilingByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByFilingID(input.filingId);
      }),
    //Get All Filing
    findAllFiling: this.trpcService.trpc.procedure.query(() => {
      return this.filingService.findAllFiling();
    }),
    // Get Filings By UserID -> Filing[]
    findFilingsByUserId: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByUserID(input.userId);
      }),
    // Get Filings By ProjectID -> Filing[]
    findFilingsByProjectId: this.trpcService.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByProjectID(input.projectId);
      }),
    // Create a new Filing
    createFiling: this.trpcService.trpc.procedure
      .input(
        z.object({
          projectId: z.string(),
          filingName: z.string(),
          filingType: z.number(),
          userId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.filingService.createFiling(
          input.projectId,
          input.filingName,
          input.filingType,
          input.userId,
        );
      }),

    //Update filing name

    updateFilingName: this.trpcService.trpc.procedure
      .input(
        z.object({
          filingId: z.string(),
          filingName: z.string().optional(),
          filingStatus: z.nativeEnum(FilingStatus).optional(),
        }),
      )
      .query(({ input }) => {
        return this.filingService.updateFiling(input.filingId, {
          name: input.filingName,
          status: input.filingStatus,
        });
      }),
    //Delete filing
    deleteFiling: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.filingService.deleteFiling(input.filingId);
      }),
    // Get Filing By FilingID -> Filing
    getFilingByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByFilingID(input.filingId);
      }),

    //findFilingWithFilter
    findFilingsWithFilter: this.trpcService.trpc.procedure
      .input(
        z.object({
          status: z.string(),
          type: z.string(),
          department: z.string(),
          id: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        return this.filingService.findFilingsWithFilter({
          status: input.status,
          type: input.type,
          department: input.department,
          id: input.id,
        });
      }),

    findFilingsForSearchBar: this.trpcService.trpc.procedure
      .input(z.object({ input: z.string() }))
      .query(({ input }) => {
        return this.filingService.findFilingsForSearchBar(input.input);
      }),

    findLatestFilings: this.trpcService.trpc.procedure.query(() => {
      return this.filingService.findLatestFilings();
    }),
  });
}
