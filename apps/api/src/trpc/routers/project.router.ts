import { Injectable } from '@nestjs/common';
import { ProjectService } from '../../project_/project_.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { ProjectStatus, ProjectType } from '../../constant/enum';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ProjectRouter {
  constructor(
    private readonly projectService: ProjectService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    //Get All Project
    findAllProject: this.trpcService.protectedProcedure.query(() => {
      return this.projectService.findAllProjects();
    }),

    // Get Projects By UserID -> Project[]
    findProjectsByUserId: this.trpcService.protectedProcedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByUserID(input.userId);
      }),

    getProjectByProjectId: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByProjectID(input.projectId);
      }),

    //Create a new Project
    createProject: this.trpcService.protectedProcedure
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
          owner: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
          owner: input.owner,
        });
      }),
    //Create a new Outside Project
    createOutsideProject: this.trpcService.trpc.procedure
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
          owner: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createOutsideProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
          owner: input.owner,
        });
      }),
    findProjectsWithFilter: this.trpcService.protectedProcedure
      .input(z.object({ status: z.string(), department: z.string() }))
      .query(({ input }) => {
        return this.projectService.findProjectsWithFilter({
          status: input.status,
          department: input.department,
        });
      }),

    deleteProject: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string().uuid() }))
      .mutation(async ({ input, ctx }) => {
        const project = await this.projectService.findByProjectID(
          input.projectId,
        );
        const isOwner = project.ownerId === ctx.payload.sub;
        if (!isOwner && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });
        return await this.projectService.deleteProject(input.projectId);
      }),
    updateProject: this.trpcService.protectedProcedure
      .input(
        z.object({
          projectId: z.string().uuid(),
          updatedProject: z.object({
            name: z.string().optional(),
            detail: z.string().optional(),
            reserveDate: z.date().optional(),
            status: z.nativeEnum(ProjectStatus).optional(),
            type: z.nativeEnum(ProjectType).optional(),
          }),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const project = await this.projectService.findByProjectID(
          input.projectId,
        );
        const isOwner = project.ownerId === ctx.payload.sub;
        if (!isOwner && ctx.payload.role !== 'admin')
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not the owner of the project',
          });

        const { projectId, updatedProject } = input;
        return this.projectService.updateProject(projectId, updatedProject);
      }),
  });
}
