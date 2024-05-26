import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { validate as isUUID } from 'uuid';
import { Filing } from '../entities/filing.entity';

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

  async findByProjectID(id: string): Promise<Document[]> {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundProject = await this.projectService.findByProjectID(id);
    if (!foundProject) throw new BadRequestException('Project Not Found!');

    const documents = await this.documentRepository
      .createQueryBuilder('document')
      .innerJoin(Filing, 'filing', 'document.filingId = filing.id')
      .innerJoin(Project, 'project', 'filing.projectId = project.id')
      .where('project.id = :pid', { pid: id })
      .getMany();

    return documents;
  }

  async findByUserID(id: string): Promise<Document[]> {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundUser = await this.userService.findByUserID(id);
    if (!foundUser) throw new BadRequestException('User Not Found!');

    const projects = await this.projectService.findByUserID(id);
    if (projects.length === 0) {
      return [];
    }

    const documentPromises = projects.map((projectWithLastOpen) =>
      this.findByProjectID(projectWithLastOpen.project.id),
    );
    const documentsArrays = await Promise.all(documentPromises);
    const documents = documentsArrays.flat();

    return documents;
  }
}
