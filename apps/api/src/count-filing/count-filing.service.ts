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

    switch (type) {
      case 0:
        return foundFiling.type_0_count;

      case 1:
        return foundFiling.type_1_count;

      case 2:
        return foundFiling.type_2_count;

      case 3:
        return foundFiling.type_3_count;

      case 4:
        return foundFiling.type_4_count;

      case 5:
        return foundFiling.type_5_count;

      case 6:
        return foundFiling.type_6_count;

      case 7:
        return foundFiling.type_7_count;

      case 8:
        return foundFiling.type_8_count;

      case 9:
        return foundFiling.type_9_count;

      default:
        throw new BadRequestException('Type must be 0 - 9');
    }
  }

  async addTypeCount(projectId: string, type: number) {
    const foundFiling = await this.findByProjectId(projectId);
    if (!foundFiling) {
      throw new BadRequestException('Filing Not Found!');
    }
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }

    switch (type) {
      case 0:
        foundFiling.type_0_count += 1;
        break;

      case 1:
        foundFiling.type_1_count += 1;
        break;

      case 2:
        foundFiling.type_2_count += 1;
        break;

      case 3:
        foundFiling.type_3_count += 1;
        break;

      case 4:
        foundFiling.type_4_count += 1;
        break;

      case 5:
        foundFiling.type_5_count += 1;
        break;

      case 6:
        foundFiling.type_6_count += 1;
        break;

      case 7:
        foundFiling.type_7_count += 1;
        break;

      case 8:
        foundFiling.type_8_count += 1;
        break;

      case 9:
        foundFiling.type_9_count += 1;
        break;

      default:
        throw new BadRequestException('Type must be 0 - 9');
    }

    await this.countFilingRepository.save(foundFiling);
  }
}
