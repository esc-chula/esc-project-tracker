import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { UserProj } from '../entities/UserProj.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByUserID(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }
    const user = this.userRepository.findOne({ where: { id } });
    return user;
  }
}
