import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user_/user.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UserService,
  ) {}

  async findNotificationsByUserId(userId: string) {
    try {
      const user = await this.userService.findByUserID(userId);
      if (!user) throw new Error('user not found');
      const query = this.notificationRepository.createQueryBuilder('noti');
      query.where('noti.userId = :userId', { userId });
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to find notifications');
    }
  }
}
