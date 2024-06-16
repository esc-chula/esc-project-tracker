import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user_/user.service';
import { UserProj } from '../entities/userProj.entity';
import { createProjectDTO, ProjectWithLastOpenDTO } from './project_.dto';
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

  findProjectByName(name: string) {
    return this.projectRepository.findOne({ where: { name } });
  }

  findProjectByNameAndType(name: string, type: ProjectType) {
    return this.projectRepository.findOne({ where: { name, type } });
  }

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

  async findCountOfProjectType(type: ProjectType): Promise<number> {
    return await this.projectRepository.count({ where: { type } });
  }

  async createProject(obj: createProjectDTO): Promise<Project> {
    if (!obj) throw new BadRequestException('Invalid input');
    const foundProjectByNameAndType = await this.findProjectByNameAndType(
      obj.name,
      obj.type,
    );
    if (foundProjectByNameAndType) {
      throw new BadRequestException('Project already exists');
    }
    const foundProjectByName = await this.findProjectByName(obj.name);
    if (foundProjectByName) {
      throw new BadRequestException('Project name already exists');
    }
    const project = new Project();
    const countType = await this.findCountOfProjectType(obj.type);
    const countTypeString = (countType + 1).toString().padStart(2, '0');
    const projectCode = `${obj.type}${countTypeString}`;
    const newProject = { ...project, ...obj, projectCode };
    return await this.projectRepository.save(newProject);
  }

  async createOutsideProject(obj: createProjectDTO): Promise<Project> {
    if (!obj) throw new BadRequestException('Invalid input');
    const foundProjectByNameAndType = await this.findProjectByNameAndType(
      obj.name,
      obj.type,
    );
    if (foundProjectByNameAndType) {
      throw new BadRequestException('Project already exists');
    }
    const foundProjectByName = await this.findProjectByName(obj.name);
    if (foundProjectByName) {
      throw new BadRequestException('Project name already exists');
    }
    const project = new Project();
    const projectCode = `${obj.type}00`;
    const newProject = { ...project, ...obj, projectCode };
    return await this.projectRepository.save(newProject);
  }

  async findProjectWithFilter(filter: { status?: string }): Promise<Project[]> {
    try {
      const query = await this.projectRepository.createQueryBuilder('project');
      // if (filter.department) {
      //   query.andWhere('project.type := ');
      // }
      if (filter.status) {
        query.andWhere('project.status = :status', { status: filter.status });
      }
      // if (filter.type) {
      //   query.andWhere('project.type = :type', { type: filter.type });
      // }

      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch Projects');
    }
  }
}
