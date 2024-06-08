import { Injectable } from '@nestjs/common';
import { UserProjService } from './user-proj.service';
import { TrpcService } from '../trpc/trpc.service';
import { optional, string, z } from 'zod';

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
  });
}
