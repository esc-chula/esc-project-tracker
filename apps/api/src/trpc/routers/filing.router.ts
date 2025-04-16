import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { FilingStatus, FilingSubType } from '@repo/shared';
import { FilingService } from '../../filing/filing.service';
import { TRPCError } from '@trpc/server';
import { ProjectService } from '../../project_/project_.service';

@Injectable()
export class FilingRouter {
  constructor(
    private readonly projectService: ProjectService,
    private readonly filingService: FilingService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    //Get All Filing
    findAllFiling: this.trpcService.protectedProcedure.query(() => {
      return this.filingService.findAllFiling();
    }),
    // Get Filings By UserID -> Filing[]
    findFilingsByUserId: this.trpcService.protectedProcedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByUserID(input.userId);
      }),
    // Get Filings By ProjectID -> Filing[]
    findFilingsByProjectId: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByProjectID(input.projectId);
      }),
    // Create a new Filing
    createFiling: this.trpcService.protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
          filingName: z.string(),
          filingType: z.number(),
          userId: z.string(),
          subType: z.nativeEnum(FilingSubType).nullable(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { isMember } = await this.trpcService.isProjectMember(
          ctx.payload.sub,
          input.projectId,
          'project',
        );
        if (!isMember)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not a member of the project',
          });
        return this.filingService.createFiling(
          input.projectId,
          input.filingName,
          input.filingType,
          input.userId,
          input.subType,
        );
      }),

    //Update filing name

    updateFilingName: this.trpcService.protectedProcedure
      .input(
        z.object({
          filingId: z.string(),
          filingName: z.string().optional(),
          filingStatus: z.nativeEnum(FilingStatus).optional(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { isMember } = await this.trpcService.isProjectMember(
          ctx.payload.sub,
          input.filingId,
          'filing',
        );
        if (!isMember && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not a member of the project',
          });
        return this.filingService.updateFiling(input.filingId, {
          name: input.filingName,
          status: input.filingStatus,
        });
      }),
    //Delete filing
    deleteFiling: this.trpcService.protectedProcedure
      .input(z.object({ filingId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const filingRaw = await this.filingService.findByFilingID(
          input.filingId,
        );
        const projectRaw = await this.projectService.findByProjectID(
          filingRaw?.projectId || '',
        );
        const isOwner = (projectRaw?.ownerId || '') === ctx.payload.sub;
        if (!isOwner)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });
        return this.filingService.deleteFiling(input.filingId);
      }),
    // Get Filing By FilingID -> Filing
    getFilingByFilingId: this.trpcService.protectedProcedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByFilingID(input.filingId);
      }),

    //findFilingWithFilter
    findFilingsWithFilter: this.trpcService.protectedProcedure
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

    findLatestFilings: this.trpcService.adminProcedure.query(() => {
      return this.filingService.findLatestFilings();
    }),
  });
}
