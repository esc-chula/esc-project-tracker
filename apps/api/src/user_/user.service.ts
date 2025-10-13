import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { AuthRole } from '@repo/shared';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(user: CreateUserDTO) {
    const createdUser = await this.userRepository.save({
      ...user,
      role: 'student',
    });
    return createdUser;
  }

  async findByUserID(id: string) {
    if (this.configService.get<string>('DEV_MODE') === 'true') {
      return {
        id: 'bb64e6eb-ad7e-4a21-a879-d0612b218996',
        username: 'mock' + (this.configService.get<string>('DEV_MODE_ROLE') || 'esc'),
        studentId: '6630000021',
        role: (this.configService.get<string>('DEV_MODE_ROLE') || 'esc') as AuthRole,
        tel: '0812345678',
        refreshToken: 'mock-refresh-token',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
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
