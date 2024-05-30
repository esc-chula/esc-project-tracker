import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountFiling } from '../entities/countFiling.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { ProjectService } from '../project_/project_.service';

@Injectable()
export class CountFilingService {
  constructor(
    @InjectRepository(CountFiling)
    private readonly countFilingRepository: Repository<CountFiling>,
    private readonly projectService: ProjectService,
  ) {}

  async findByProjectId(projectId: string) {
    if (!isUUID(projectId)) {
      throw new BadRequestException('Project Id is not in UUID format');
    }

    const foundProject = await this.projectService.findByProjectID(projectId);
    if (!foundProject) {
      throw new BadRequestException('Project Not Found!');
    }

    const foundFiling = await this.countFilingRepository
      .createQueryBuilder('countFiling')
      .where('countFiling.projectId = :projectId', { projectId })
      .getOne();

    return foundFiling;
  }

  async getTypeCount(projectId: string, type: number) {
    const foundFiling = await this.findByProjectId(projectId);
    if (!foundFiling) {
      throw new BadRequestException('Filing Not Found!');
    }
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }

    const typeCount = foundFiling[`type_${type}_count`];
    return typeCount;
  }

  async addTypeCount(projectId: string, type: number) {
    const foundFiling = await this.findByProjectId(projectId);
    if (!foundFiling) {
      throw new BadRequestException('Filing Not Found!');
    }
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }

    const typeCount = foundFiling[`type_${type}_count`];
    foundFiling[`type_${type}_count`] = typeCount + 1;
    await this.countFilingRepository.save(foundFiling);
  }
}
