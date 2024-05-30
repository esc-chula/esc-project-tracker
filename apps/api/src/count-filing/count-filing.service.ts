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
  ) {}

  async findByTypeNumber(type: number): Promise<CountFiling> {
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }
    const string_type = type.toString();
    const foundCountFiling = await this.countFilingRepository
      .createQueryBuilder('countFiling')
      .where('countFiling.id = :id', { id: string_type })
      .getOne();

    if (!foundCountFiling) {
      return await this.createNewTypeCount(type);
    }

    return foundCountFiling;
  }

  async getTypeCount(type: number): Promise<number> {
    const foundFiling = await this.findByTypeNumber(type);
    if (!foundFiling) {
      throw new BadRequestException('Filing Not Found!');
    }
    return foundFiling.count;
  }

  async addTypeCount(type: number) {
    const foundFiling = await this.findByTypeNumber(type);
    if (!foundFiling) {
      throw new BadRequestException('Filing Not Found!');
    }
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }

    foundFiling.count += 1;

    return await this.countFilingRepository.save(foundFiling);
  }

  async createNewTypeCount(type: number) {
    if (type < 0 || type > 9) {
      throw new BadRequestException('Type must be 0 - 9');
    }

    const newCountFiling = new CountFiling();
    newCountFiling.id = type.toString();
    newCountFiling.count = 0;

    return await this.countFilingRepository.save(newCountFiling);
  }
}
