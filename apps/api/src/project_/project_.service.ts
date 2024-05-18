import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user_/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findByProjectID(projectID: string): Promise<Project> {
    const project = this.projectRepository.findOne({ where: { projectID } });
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    return project;
  }
}
