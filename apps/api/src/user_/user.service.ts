import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';
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

  findUserByCondition(condition: FindOptionsWhere<User>) {
    const user = this.userRepository.findOne({ where: condition });
    return user;
  }
}
