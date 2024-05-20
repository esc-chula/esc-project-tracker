import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  findByDocID(id: string): Promise<Document> {
    return this.documentRepository.findOne({ where: { id } });
  }

  async getByProjectID(id: string): Promise<Document[]> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }
    const foundProject = await this.projectService.findByProjectID(id);
    if (!foundProject) {
      throw new BadRequestException('Project not found');
    }

    const documents = await this.documentRepository
      .createQueryBuilder('document')
      .innerJoin(Project, 'project', 'document.projectId = project.id')
      .where('project.id = :pid', { pid: id })
      .getMany();

    return documents;
  }
}
