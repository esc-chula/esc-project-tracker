import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { UserProjService } from '../../user-proj/user-proj.service';

@Injectable()
export class UserProjRouter {
  constructor(
    private readonly userProjService: UserProjService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    updateUserProjLastOpen: this.trpcService.trpc.procedure
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
    createUserProject: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.createUserProject({
          obj: { userId: input.userId, projectId: input.projectId },
        });
      }),

    //Delete User Project (User leave Project)
    deleteUserProject: this.trpcService.trpc.procedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.deleteUserProject({
          obj: { userId: input.userId, projectId: input.projectId },
        });
      }),

    hasUserProj: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string(), projectId: z.string() }))
      .query(({ input }) => {
        return this.userProjService.hasUserProj({
          userId: input.userId,
          projectId: input.projectId,
        });
      }),
  });
}
