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

    const newFiling = new Filing();
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
    try {
      if (!isUUID(id))
        throw new BadRequestException('Id is not in UUID format.');
      const foundFiling = await this.findByFilingID(id);
      if (!foundFiling) throw new BadRequestException('Filing Not Found!');

      const updatedFiling = await this.filingRepository.save({
        ...foundFiling,
        ...filing,
      });

      const latestDocument =
        await this.documentService.findLatestDocumentByFilingId(
          updatedFiling.id,
        );
      const newDocumentName = this.describeUpdatedFiling(filing);

      await this.documentService.createDocument({
        filingId: updatedFiling.id,
        name: newDocumentName,
        detail: latestDocument?.detail || '',
        pdfLink: latestDocument?.pdfLink || '',
        docLink: latestDocument?.docLink || '',
        activity: latestDocument?.activity || DocumentActivity.CREATE,
      });

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
            acc + `เปลี่ยน${FilingFieldTranslate[key]}ของเอกสารเป็น ${value}, `
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
    try {
      const data = await this.filingRepository.find();
      return data;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to fetch Filings');
    }
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
      const query = await this.filingRepository.createQueryBuilder('filing');
      query.where('filing.name ILIKE :input', { input: `%${input}%` });
      query.orWhere('filing.FilingCode ILIKE :input', { input: `%${input}%` });
      return await query.getMany();
    } catch (error) {
      console.log(error.string);
      throw new Error(error.string);
    }
  }
}
