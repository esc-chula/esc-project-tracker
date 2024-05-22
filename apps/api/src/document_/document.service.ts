import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/Document.entity';
import { Repository } from 'typeorm';
import { Project } from '../entities/Project.entity';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly projectService: ProjectService,
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

  async getByUserID(id: string): Promise<Document[]> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const projects = await this.projectService.findByUserID(id);

    let documents: Document[] = [];

    for (const project of projects) {
      const doc = await this.getByProjectID(project.id);
      documents = [...doc, ...documents];
    }

    console.log(documents);

    return documents;
  }
}
