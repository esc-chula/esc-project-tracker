import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { FilingSubType } from '@repo/shared';
import { TRPCError } from '@trpc/server';
import { ProjectService } from '../../project_/project_.service';
import { GendocService } from '../../gendoc/gendoc.service';

@Injectable()
export class GendocRouter {
  constructor(
    private readonly projectService: ProjectService,
    private readonly gendocService: GendocService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    //Get All Gendoc
    findAllGendoc: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Get all generated documents' } })
      .query(() => {
        return this.gendocService.findAllGendoc();
      }),
    // Get Gendocs By ProjectID -> Gendoc[]
    findGendocsByProjectId: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Get generated documents by project ID' } })
      .input(z.object({ projectId: z.string().uuid() }))
      .query(({ input }) => {
        return this.gendocService.findByProjectID(input.projectId);
      }),
    // Create a new Gendoc
    createGendoc: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Generate a new document from template' } })
      .input(
        z.object({
          customProjectName: z.string(),
          name: z.string(),
          type: z.number(),
          userId: z.string().uuid(),
          filingCode: z.string(),
          subType: z.nativeEnum(FilingSubType).nullable(),
          projectCode: z.string(),
          projectId: z.string().uuid().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return this.gendocService.createGendoc(
          input.customProjectName,
          input.name,
          input.type,
          input.userId,
          input.filingCode,
          input.subType,
          input.projectCode,
          input.projectId,
        );
      }),

    //Update gendoc

    updateGendocName: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Update generated document name (members or admin)' } })
      .input(
        z.object({
          gendocId: z.string(),
          name: z.string().optional(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { isMember } = await this.trpcService.isProjectMember(
          ctx.payload.sub,
          input.gendocId,
          'filing',
        );
        if (!isMember && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not a member of the project',
          });
        return this.gendocService.updateGendoc(input.gendocId, {
          name: input.name,
        });
      }),

    //Delete Gendoc
    deleteGendoc: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Delete a generated document (project owner only)' } })
      .input(z.object({ gendocId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const gendocRaw = await this.gendocService.findByGendocID(
          input.gendocId,
        );
        const projectRaw = await this.projectService.findByProjectID(
          gendocRaw?.projectId || '',
        );
        const isOwner = (projectRaw?.ownerId || '') === ctx.payload.sub;
        if (!isOwner)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });
        return this.gendocService.deleteGendoc(input.gendocId);
      }),
    // Get Gendoc By GendocID -> Gendoc
    getGendocByGendocId: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['Document Generation'], summary: 'Get generated document by ID' } })
      .input(z.object({ gendocId: z.string() }))
      .query(({ input }) => {
        return this.gendocService.findByGendocID(input.gendocId);
      }),
  });
}
