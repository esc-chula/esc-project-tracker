import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user_/user.service';
import { UserProj } from '../entities/userProj.entity';
import { ProjectWithLastOpenDTO } from './project_.dto';
import { ProjectType } from '../constant/enum';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(UserProj)
    private readonly userProjRepository: Repository<UserProj>,
    private readonly userService: UserService,
  ) {}

  findByProjectID(id: string) {
    const project = this.projectRepository.findOne({ where: { id } });
    return project;
  }

  async findByUserID(id: string): Promise<ProjectWithLastOpenDTO[]> {
    const foundUser = await this.userService.findByUserID(id);
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoin(UserProj, 'userProj', 'project.id = userProj.projectId')
      .where('userProj.userId = :uid', { uid: id })
      .select(['project', 'userProj.lastOpen'])
      .getRawAndEntities();

    const projectWithLastOpenDTOs = projects.raw.map((rawProject, index) => {
      const projectWithLastOpenDTO = new ProjectWithLastOpenDTO();
      projectWithLastOpenDTO.project = projects.entities[index];
      projectWithLastOpenDTO.lastOpen = rawProject.userProj_lastOpen;
      return projectWithLastOpenDTO;
    });

    return projectWithLastOpenDTOs;
  }

  async findByNameOrCode(
    { page, limit }: { page: number; limit: number },
    name?: string,
    projectCode?: string,
  ): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: [{ name }, { projectCode }],
      take: limit,
      skip: (page - 1) * limit,
    });
    return projects;
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  findCountOfProjectType(type: ProjectType): Promise<number> {
    return this.projectRepository.count({ where: { type } });
  }
}
