import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProj } from '../entities/userProj.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { CreateUserProjDTO, DeleteUserProjDTO } from './user-project.dto';

@Injectable()
export class UserProjService {
  constructor(
    @InjectRepository(UserProj)
    private readonly userProjRepository: Repository<UserProj>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
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

  async createUserProject({
    obj,
  }: {
    obj: CreateUserProjDTO;
  }): Promise<UserProj> {
    if (!isUUID(obj.userId) || !isUUID(obj.projectId)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const foundUser = await this.userService.findByUserID(obj.userId);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const foundProject = await this.projectService.findByProjectID(
      obj.projectId,
    );
    if (!foundProject) {
      throw new BadRequestException('Project not found');
    }

    const foundUserProj = await this.findByUserIDAndProjectID({
      userId: obj.userId,
      projectId: obj.projectId,
    });
    if (foundUserProj) {
      throw new BadRequestException('UserProj already exists');
    }

    const newUserProj = new UserProj();
    newUserProj.user = foundUser;
    newUserProj.project = foundProject;
    newUserProj.lastOpen = new Date();

    return await this.userProjRepository.save(newUserProj);
  }

  async deleteUserProject({ obj }: { obj: DeleteUserProjDTO }) {
    if (!isUUID(obj.userId) || !isUUID(obj.projectId)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const userProj = await this.findByUserIDAndProjectID({
      userId: obj.userId,
      projectId: obj.projectId,
    });

    if (!userProj) {
      throw new BadRequestException('UserProj not found');
    }
    await this.userProjRepository.remove(userProj);
    return userProj;
  }

  async hasUserProj({
    userId,
    projectId,
  }: {
    userId: string;
    projectId: string;
  }) {
    const userProj = await this.userProjRepository
      .createQueryBuilder('userProj')
      .where('userProj.userId = :uid', { uid: userId })
      .andWhere('userProj.projectId = :pid', { pid: projectId })
      .getOne();
    if (!userProj) {
      return false;
    } else {
      return true;
    }
  }

  async joinProjectByStudentId({
    studentId,
    projectId,
  }: {
    studentId: string;
    projectId: string;
  }): Promise<UserProj> {
    const user = await this.userService.findUserByCondition({ studentId });
    if (!user) throw new BadRequestException('No user match with studentId');
    return await this.createUserProject({
      obj: {
        userId: user.id,
        projectId,
      },
    });
  }

  async leaveProjectByStudentId({
    studentId,
    projectId,
  }: {
    studentId: string;
    projectId: string;
  }): Promise<UserProj> {
    const foundUser = await this.userService.findUserByCondition({ studentId });
    if (!foundUser)
      throw new BadRequestException('No user match with studentId');
    const foundProject = await this.projectService.findByProjectID(projectId);
    if (!foundProject)
      throw new BadRequestException('No project match with projectId');

    if (foundUser.id === foundProject.ownerId)
      throw new BadRequestException('Owner cannot leave project');

    return await this.deleteUserProject({
      obj: { userId: foundUser.id, projectId },
    });
  }
}
