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
    findNotificationsByUserId: this.trpcService.trpc.procedure
      .meta({ route: { tags: ['Notifications'], summary: 'Get notifications for a user' } })
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        this.notificationService.findNotificationsByUserId(input.userId);
      }),
  });
}
