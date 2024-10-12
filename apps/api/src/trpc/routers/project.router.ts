import { Injectable } from '@nestjs/common';
import { ProjectService } from '../../project_/project_.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { ProjectStatus, ProjectType } from '../../constant/enum';

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

    findProjectsWithFilter: this.trpcService.protectedProcedure
      .input(z.object({ status: z.string(), department: z.string() }))
      .query(({ input }) => {
        return this.projectService.findProjectsWithFilter({
          status: input.status,
          department: input.department,
        });
      }),

    // NOTE: Permission for Admin and Owner
    deleteProject: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string().uuid() }))
      .mutation(async ({ input }) => {
        return await this.projectService.deleteProject(input.projectId);
      }),

    // NOTE: Permission for Admin and Owner
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
      .mutation(async ({ input }) => {
        const { projectId, updatedProject } = input;
        return this.projectService.updateProject(projectId, updatedProject);
      }),
  });
}
