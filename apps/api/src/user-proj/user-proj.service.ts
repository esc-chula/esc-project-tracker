import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProj } from '../entities/userProj.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserProjService {
  constructor(
    @InjectRepository(UserProj)
    private readonly userProjRepository: Repository<UserProj>,
  ) {}

  async findByUserIDAndProjectID({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    if (!isUUID(userId) || !isUUID(projectId)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const userProj = this.userProjRepository
      .createQueryBuilder('userProj')
      .where('userProj.userId = :uid', { uid: userId })
      .andWhere('userProj.projectId = :pid', { pid: projectId })
      .getOne();

    if (!userProj) {
      throw new BadRequestException('UserProj not found');
    }

    return userProj;
  }

  async updateUserProjLastOpen({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    const userProj = await this.findByUserIDAndProjectID({ userId, projectId });

    if (userProj) {
      return await this.userProjRepository.update(userProj.id, {
        lastOpen: new Date(),
      });
    }
  }
}
