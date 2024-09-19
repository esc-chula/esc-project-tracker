import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from '../entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user_/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
