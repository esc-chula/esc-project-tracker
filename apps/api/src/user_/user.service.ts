import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDTO) {
    const createdUser = await this.userRepository.save({
      ...user,
      role: 'student',
    });
    return createdUser;
  }

  async findByUserID(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findByStudentID(studentId: string) {
    const user = await this.userRepository.findOne({
      where: { studentId },
    });
    return user;
  }

  async findUserByCondition(condition: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({ where: condition });
    return user;
  }

  async update(id: string, updateUser: UpdateUserDTO) {
    const updatedUser = await this.userRepository.save({
      id,
      ...updateUser,
    });
    return updatedUser;
  }
}
