import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filing } from '../entities/filing.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { ProjectService } from '../project_/project_.service';
import { UserService } from '../user_/user.service';
import { DocumentActivity, FilingStatus } from '../constant/enum';
import { CountFilingService } from '../count-filing/count-filing.service';
import { Project } from '../entities/project.entity';
import { FilingFieldTranslate } from '../constant/translate';
import { DocumentService } from '../document_/document.service';
import { CreateDocumentDTO } from '../document_/document.dto';

@Injectable()
export class FilingService {
  constructor(
    @InjectRepository(Filing)
    private readonly filingRepository: Repository<Filing>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    private readonly countFilingService: CountFilingService,
    @Inject(forwardRef(() => DocumentService))
    private readonly documentService: DocumentService,
  ) {}

  findByFilingID(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
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

    const filingsArraysWithProject = [];
    for (let i = 0; i < filingsArrays.length; i++) {
      const project = projects[i].project;
      const filingsWithProject = [];
      for (let j = 0; j < filingsArrays[i].length; j++) {
        const filingWithProject = {
          ...filingsArrays[i][j],
          project: project,
        };
        filingsWithProject.push(filingWithProject);
      }
      filingsArraysWithProject.push(filingsWithProject);
    }

    const filingsWithProject = filingsArraysWithProject.flat();

    return filingsWithProject;
  }

  async createFiling(
    projectId: string,
    filingName: string,
    filingType: number,
    userId: string,
  ) {
    if (!isUUID(projectId) || !isUUID(userId))
      throw new BadRequestException('Ids are not in UUID format.');
    const foundProject = await this.projectService.findByProjectID(projectId);
    if (!foundProject) throw new BadRequestException('Project Not Found');

    const foundUser = await this.userService.findByUserID(userId);
    if (!foundUser) throw new BadRequestException('User Not Found');

    const numberOfFilingType =
      await this.countFilingService.getTypeCount(filingType);

    const formattedNumberOfFilingType = String(numberOfFilingType + 1).padStart(
      3,
      '0',
    );

    const newFiling = new Filing();
    newFiling.project = foundProject;
    newFiling.name = filingName;
    newFiling.status = FilingStatus.DRAFT;
    newFiling.FilingCode = `${filingType}${formattedNumberOfFilingType}`;
    newFiling.type = filingType;
    newFiling.projectCode = foundProject.projectCode;
    newFiling.userId = userId;

    this.countFilingService.incrementTypeCount(filingType);

    return this.filingRepository.save(newFiling);
  }

  async updateFiling(id: string, filing: Partial<Filing>) {
    try {
      if (!isUUID(id))
        throw new BadRequestException('Id is not in UUID format.');
      const foundFiling = await this.findByFilingID(id);
      if (!foundFiling) throw new BadRequestException('Filing Not Found!');

      const updatedFiling = await this.filingRepository.save({
        ...foundFiling,
        ...filing,
      });

      // const latestDocument =
      //   await this.documentService.findLatestDocumentByFilingId(
      //     updatedFiling.id,
      //   );
      // const newDocumentName = this.describeUpdatedFiling(filing);

      // await this.documentService.createDocument({
      //   filingId: updatedFiling.id,
      //   name: newDocumentName,
      //   detail: latestDocument?.detail || '',
      //   pdfName: latestDocument?.pdfName || '',
      //   docName: latestDocument?.docName || '',
      //   activity: latestDocument?.activity || DocumentActivity.CREATE,
      // });

      return updatedFiling;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update Filing');
    }
  }

  describeUpdatedFiling(filing: Partial<Filing>) {
    const newDocumentName = Object.entries(filing)
      .reduce((acc, [key, value]) => {
        if (value) {
          return (
            acc +
            `เปลี่ยน${FilingFieldTranslate[key as keyof typeof FilingFieldTranslate]}ของเอกสารเป็น ${value}, `
          );
        }
        return acc;
      }, '')
      .slice(0, -2);

    return newDocumentName;
  }

  async deleteFiling(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundFiling = await this.findByFilingID(id);
    if (!foundFiling) throw new BadRequestException('Filing Not Found!');

    this.filingRepository.delete(id);

    return foundFiling;
  }

  async findAllFiling(): Promise<Filing[]> {
    const projects = await this.projectService.findAllProjects();
    if (projects.length === 0) {
      return [];
    }

    const filingPromises = projects.map((project) =>
      this.findByProjectID(project.id),
    );
    const filingsArrays = await Promise.all(filingPromises);

    const filingsArraysWithProject: Filing[][] = [];
    for (let i = 0; i < filingsArrays.length; i++) {
      const project = projects[i];
      const filingsWithProject: Filing[] = [];
      for (let j = 0; j < filingsArrays[i].length; j++) {
        const filingWithProject = {
          ...filingsArrays[i][j],
          project: project,
        };
        filingsWithProject.push(filingWithProject);
      }
      filingsArraysWithProject.push(filingsWithProject);
    }

    const filingsWithProject = filingsArraysWithProject.flat();

    return filingsWithProject;
  }

  async findFilingsWithFilter(filter: {
    status: string;
    type: string;
    department: string;
    id?: string;
  }): Promise<Filing[]> {
    try {
      const query = await this.filingRepository.createQueryBuilder('filing');

      if (filter.id) {
        query.andWhere('filing.id = :id', { id: filter.id });
      }
      if (filter.status !== 'ALL') {
        query.andWhere('filing.status = :status', { status: filter.status });
      }

      if (filter.type !== 'ALL') {
        query.andWhere('filing.type = :type', { type: +filter.type });
      }

      if (filter.department !== 'ALL') {
        query.andWhere('filing.projectCode LIKE :department', {
          department: `${filter.department}%`,
        });
      }

      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch Filings');
    }
  }

  async findFilingsForSearchBar(input: string): Promise<Filing[]> {
    try {
      const query = this.filingRepository.createQueryBuilder('filing');
      query.where('filing.name ILIKE :input', { input: `%${input}%` });
      query.orWhere('filing.FilingCode ILIKE :input', { input: `%${input}%` });
      return await query.getMany();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to find Filings for Search Bar');
    }
  }

  async updateStatus(id: string, status: FilingStatus) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundFiling = await this.findByFilingID(id);
    if (!foundFiling) throw new BadRequestException('Filing Not Found!');

    return await this.filingRepository
      .save({
        ...foundFiling,
        status,
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Failed to update filing status');
      });
  }

  async findLatestFilings() {
    const approvedFilings = this.filingRepository
      .createQueryBuilder('filing')
      .where('filing.status = :status', { status: FilingStatus.APPROVED })
      .orderBy('filing.updatedAt', 'DESC')
      .limit(3)
      .getMany();

    const returnedFilings = this.filingRepository
      .createQueryBuilder('filing')
      .where('filing.status = :status', { status: FilingStatus.RETURNED })
      .orderBy('filing.updatedAt', 'DESC')
      .limit(3)
      .getMany();

    const pendingFilings = this.filingRepository
      .createQueryBuilder('filing')
      .where('filing.status = :status', {
        status: FilingStatus.WAIT_FOR_SECRETARY,
      })
      .orderBy('filing.updatedAt', 'DESC')
      .limit(3)
      .getMany();

    const filings = await Promise.all([
      approvedFilings,
      returnedFilings,
      pendingFilings,
    ]);
    return filings.flat();
  }

  async findUserFilingOrderByLastOpen(
    userId: string,
    limit?: number,
  ): Promise<Filing[]> {
    if (!isUUID(userId)) {
      throw new BadRequestException('Id is not in UUID format');
    }

    const userFilings = this.filingRepository
      .createQueryBuilder('filing')
      .where('filing.userId = :userId', { userId })
      .orderBy('filing.lastOpen', 'DESC')
      .limit(limit || 20)
      .getMany()
      .catch((error) => {
        console.error(error);
        throw new BadRequestException('Error when getting user filing');
      });

    return userFilings;
  }
}
