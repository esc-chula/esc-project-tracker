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
          studentId: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        return this.userService.findUserByCondition({
          id: input.id,
          studentId: input.studentId,
        });
      }),
  });
}
