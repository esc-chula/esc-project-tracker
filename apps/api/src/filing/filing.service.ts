import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filing } from '../entities/Filing.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { ProjectService } from '../project_/project_.service';
import { UserService } from '../user_/user.service';

@Injectable()
export class FilingService {
  constructor(
    @InjectRepository(Filing)
    private readonly filingRepository: Repository<Filing>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  findByFilingID(id: string): Promise<Filing> {
    return this.filingRepository.findOne({ where: { id } });
  }

  async findByProjectID(id: string): Promise<Filing[]> {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundProject = await this.projectService.findByProjectID(id);
    if (!foundProject) throw new BadRequestException('Project Not Found!');

    const filings = await this.filingRepository
      .createQueryBuilder('filing')
      .where('filing.projectId = :id', { id })
      .getMany();
    return filings;
  }

  async findByUserID(id: string): Promise<Filing[]> {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundUser = await this.userService.findByUserID(id);
    if (!foundUser) throw new BadRequestException('User Not Found!');

    const projects = await this.projectService.findByUserID(id);
    if (projects.length === 0) {
      return [];
    }

    const filingPromises = projects.map((project) =>
      this.findByProjectID(project.id),
    );
    const filingsArrays = await Promise.all(filingPromises);
    const filings = filingsArrays.flat();

    return filings;
  }
}
