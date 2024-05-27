import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserProj } from '../entities/userProj.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByUserID(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }
    const user = this.userRepository.findOne({ where: { id } });
    return user;
  }
}
