import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { z } from 'zod';
import { NotificationService } from '../../notification/notification.service';

@Injectable()
export class NotificationRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly notificationService: NotificationService,
  ) {}
  appRouter = this.trpcService.router({
    findAllNotificationByUserId: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        this.notificationService.findAllNotificationByUserId(input.userId);
      }),
  });
}
