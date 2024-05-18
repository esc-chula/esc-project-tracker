import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByUserID(userID: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { userID } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
