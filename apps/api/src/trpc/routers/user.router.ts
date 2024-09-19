import { Injectable } from '@nestjs/common';
import { UserService } from '../../user_/user.service';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';

@Injectable()
export class UserRouter {
  constructor(
    private readonly userService: UserService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    findUserByCondition: this.trpcService.trpc.procedure
      .input(
        z.object({
          id: z.string().optional(),
          username: z.string().optional(),
          studentId: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        return this.userService.findUserByCondition({
          id: input.id,
          username: input.username,
          studentId: input.studentId,
        });
      }),

    findUserByUserId: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.userService.findByUserID(input.userId);
      }),
  });
}
