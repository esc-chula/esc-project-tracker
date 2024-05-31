import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filing } from '../entities/filing.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { ProjectService } from '../project_/project_.service';
import { UserService } from '../user_/user.service';
import { FilingStatus } from '../constant/enum';
import { CountFilingService } from '../count-filing/count-filing.service';

@Injectable()
export class FilingService {
  constructor(
    @InjectRepository(Filing)
    private readonly filingRepository: Repository<Filing>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly countFilingService: CountFilingService,
  ) {}

  findByFilingID(id: string) {
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

    const filingPromises = projects.map((projectWithLastOpen) =>
      this.findByProjectID(projectWithLastOpen.project.id),
    );
    const filingsArrays = await Promise.all(filingPromises);
    const filings = filingsArrays.flat();

    return filings;
  }

  async createFiling(
    projectId: string,
    filingName: string,
    filingType: number,
  ) {
    if (!isUUID(projectId))
      throw new BadRequestException('Project Id is not in UUID format.');
    const foundProject = await this.projectService.findByProjectID(projectId);
    if (!foundProject) throw new BadRequestException('Project Not Found');

    const numberOfFilingType =
      await this.countFilingService.getTypeCount(filingType);

    const formattedNumberOfFilingType = String(numberOfFilingType + 1).padStart(
      3,
      '0',
    );

    var newFiling = new Filing();
    newFiling.project = foundProject;
    newFiling.name = filingName;
    newFiling.status = FilingStatus.DRAFT;
    newFiling.FilingCode = `${filingType}${formattedNumberOfFilingType}`;
    newFiling.type = filingType;
    newFiling.projectCode = foundProject.projectCode;

    this.countFilingService.incrementTypeCount(filingType);

    return this.filingRepository.save(newFiling);
  }

  async updateFiling(id: string, filing: Partial<Filing>) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundFiling = await this.findByFilingID(id);
    if (!foundFiling) throw new BadRequestException('Filing Not Found!');

    return this.filingRepository.save({ ...foundFiling, ...filing });
  }

  async deleteFiling(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundFiling = await this.findByFilingID(id);
    if (!foundFiling) throw new BadRequestException('Filing Not Found!');

    this.filingRepository.delete(id);

    return foundFiling;
  }
}
