import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { FilingSubType } from '../../constant/enum';
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
    findAllGendoc: this.trpcService.protectedProcedure.query(() => {
      return this.gendocService.findAllGendoc();
    }),
    // Get Gendocs By ProjectID -> Gendoc[]
    findGendocsByProjectId: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.gendocService.findByProjectID(input.projectId);
      }),
    // Create a new Gendoc
    createGendoc: this.trpcService.protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
          name: z.string(),
          type: z.number(),
          userId: z.string(),
          filingCode: z.string(),
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
        return this.gendocService.createGendoc(
          input.projectId,
          input.name,
          input.type,
          input.userId,
          input.filingCode,
          input.subType,
        );
      }),

    //Update gendoc

    updateGendocName: this.trpcService.protectedProcedure
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
      .input(z.object({ gendocId: z.string() }))
      .query(({ input }) => {
        return this.gendocService.findByGendocID(input.gendocId);
      }),
  });
}
