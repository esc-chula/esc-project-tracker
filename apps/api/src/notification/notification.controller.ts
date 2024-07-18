import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('/testNotification')
  findAllNotificationByUserId(@Body() obj: { userId: string }) {
    return this.notificationService.findAllNotificationByUserId(obj.userId);
  }
}
