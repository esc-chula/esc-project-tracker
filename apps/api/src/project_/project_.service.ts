import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserService } from '../user_/user.service';
import { UserProj } from '../entities/userProj.entity';
import { createProjectDTO, ProjectWithLastOpenDTO } from './project_.dto';
import { ProjectType } from '../constant/enum';
import { validate as isUUID } from 'uuid';

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
    console.log('foundUser', foundUser);
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

  async findAllProjects(): Promise<ProjectWithLastOpenDTO[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoin(UserProj, 'userProj', 'project.id = userProj.projectId')
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

    const owner = await this.userService.findByUserID(obj.owner);
    if (!owner) throw new BadRequestException('Project Owner not found!!!');
    const project = new Project();
    const countType = await this.findCountOfProjectType(obj.type);
    const countTypeString = (countType + 1).toString().padStart(2, '0');
    const projectCode = `${obj.type}${countTypeString}`;

    const newProject = {
      ...project,
      projectCode,
      owner,
      name: obj.name,
      type: obj.type,
    };
    if (obj.detail) {
      newProject.detail = obj.detail;
    }
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

    const owner = await this.userService.findByUserID(obj.owner);
    if (!owner) throw new BadRequestException('Project Owner not found!!!');
    const project = new Project();
    const projectCode = `${obj.type}00`;
    const newProject = {
      ...project,
      projectCode,
      owner,
      name: obj.name,
      type: obj.type,
    };
    if (obj.detail) {
      newProject.detail = obj.detail;
    }
    return await this.projectRepository.save(newProject);
  }

  async findProjectsWithFilter(filter: {
    status: string;
    department: string;
  }): Promise<Project[]> {
    try {
      const query = await this.projectRepository.createQueryBuilder('project');
      if (filter.department !== 'ALL') {
        query.andWhere('project.type = :department', {
          department: filter.department,
        });
      }
      if (filter.status !== 'ALL') {
        query.andWhere('project.status = :status', { status: filter.status });
      }
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch Projects');
    }
  }

  async findProjectsForSearchBar(input: string): Promise<Project[]> {
    try {
      const query = await this.projectRepository.createQueryBuilder('project');
      query.where('project.name ILIKE :input', { input: `%${input}%` });
      query.orWhere('project.projectCode ILIKE :input', {
        input: `%${input}%`,
      });
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to find Projects for Search Bar');
    }
  }

  async deleteProject(id: string): Promise<Project | null> {
    const foundProject = await this.findByProjectID(id);
    if (!foundProject) {
      throw new BadRequestException('Project not found');
    }

    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }
    return await this.projectRepository.remove(foundProject);
  }

  async updateProject(
    projectId: string,
    updatedProject: Omit<Partial<Project>, 'id'>,
  ): Promise<Project> {
    if (!isUUID(projectId)) {
      throw new BadRequestException('Invalid project ID format');
    }
    const foundProject = await this.findByProjectID(projectId);
    if (!foundProject) {
      throw new BadRequestException('Project not found');
    }
    return await this.projectRepository.save({
      ...foundProject,
      ...updatedProject,
    });
  }
}
