import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user_/user.service';
import { UserProj } from '../entities/userProj.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UserProj)
    private readonly userProjRepository: Repository<UserProj>,
    private readonly userService: UserService,
  ) {}

  findByProjectID(id: string): Promise<Project> {
    const project = this.projectRepository.findOne({ where: { id } });
    return project;
  }

  async findByUserID(id: string): Promise<Project[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoin(UserProj, 'userProj', 'project.id = userProj.projectId')
      .where('userProj.userId = :uid', { uid: id })
      .getMany();

    return projects;
  }
}
