import { Injectable } from '@nestjs/common';
import { ProjectService } from '../../project_/project_.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { ProjectType } from '../../constant/enum';

@Injectable()
export class ProjectRouter {
  constructor(
    private readonly projectService: ProjectService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    //Get All Project
    getAllProject: this.trpcService.trpc.procedure.query(() => {
      return this.projectService.findAllProjects();
    }),

    // Get Projects By UserID -> Project[]
    findProjectsByUserId: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByUserID(input.userId);
      }),

    getProjectByProjectId: this.trpcService.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByProjectID(input.projectId);
      }),

    //Create a new Project
    createProject: this.trpcService.trpc.procedure
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
        });
      }),

    //Create a new Outside Project
    createOutsideProject: this.trpcService.trpc.procedure
      .input(
        z.object({
          name: z.string(),
          type: z.nativeEnum(ProjectType),
          detail: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.projectService.createOutsideProject({
          name: input.name,
          type: input.type,
          detail: input.detail,
        });
      }),
  });
}
