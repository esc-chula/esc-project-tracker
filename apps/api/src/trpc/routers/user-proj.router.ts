import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { UserProjService } from '../../user-proj/user-proj.service';
import { ProjectService } from '../../project_/project_.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class UserProjRouter {
  constructor(
    private readonly userProjService: UserProjService,
    private readonly trpcService: TrpcService,
    private readonly projectService: ProjectService,
  ) {}

  appRouter = this.trpcService.router({
    updateUserProjLastOpen: this.trpcService.protectedProcedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.updateUserProjLastOpen({
          userId: input.userId,
          projectId: input.projectId,
        });
      }),

    //Create User Project (User join Project)
    createUserProject: this.trpcService.protectedProcedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.createUserProject({
          obj: { userId: input.userId, projectId: input.projectId },
          isUpdatedLastOpen: true,
        });
      }),

    //Delete User Project (User leave Project)
    deleteUserProject: this.trpcService.protectedProcedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const project = await this.projectService.findByProjectID(
          input.projectId,
        );
        if (!project)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Project Not Found',
          });
        else if (project.ownerId === ctx.payload.sub)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Owner cannot leave project',
          });

        return this.userProjService.deleteUserProject({
          obj: { userId: input.userId, projectId: input.projectId },
        });
      }),

    hasUserProj: this.trpcService.protectedProcedure
      .input(z.object({ userId: z.string(), projectId: z.string() }))
      .query(({ input }) => {
        return this.userProjService.hasUserProj({
          userId: input.userId,
          projectId: input.projectId,
        });
      }),

    //Join Project By StudentId
    joinProjectByStudentId: this.trpcService.protectedProcedure
      .input(
        z.object({
          studentId: z
            .string()
            .regex(
              /^\d{2}[013478]\d{5}(?:01|02|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|51|53|55|56|58|63|92|99)$/gm,
              {
                message: 'invalid studentId format',
              },
            ),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.joinProjectByStudentId({
          studentId: input.studentId,
          projectId: input.projectId,
        });
      }),

    //Leave Project By StudentId
    leaveProjectByStudentId: this.trpcService.protectedProcedure
      .input(
        z.object({
          studentId: z
            .string()
            .regex(
              /^\d{2}[013478]\d{5}(?:01|02|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|51|53|55|56|58|63|92|99)$/gm,
              {
                message: 'invalid studentId format',
              },
            ),
          projectId: z.string().uuid(),
        }),
      )
      .mutation(({ input }) => {
        return this.userProjService.leaveProjectByStudentId({
          studentId: input.studentId,
          projectId: input.projectId,
        });
      }),

    findJoinedUsersByProjectId: this.trpcService.protectedProcedure
      .input(z.object({ projectId: z.string().uuid() }))
      .query(({ input }) => {
        return this.userProjService.findJoinedUsersByProjectId(input.projectId);
      }),

    findJoinedProjectsByUserId: this.trpcService.protectedProcedure
      .input(z.object({ userId: z.string().uuid() }))
      .query(({ input }) => {
        return this.userProjService.findJoinedProjectsByUserId(input.userId);
      }),
  });
}
