import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Not, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { validate as isUUID } from 'uuid';
import { Filing } from '../entities/filing.entity';
import { CreateDocumentDTO } from './document.dto';
import { FilingService } from '../filing/filing.service';
import {
  DocumentActivity,
  DocumentStatus,
  FilingStatus,
} from '../constant/enum';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => FilingService))
    private readonly filingService: FilingService,
  ) {}

  async findByDocID(id: string): Promise<Document> {
    return await this.documentRepository.findOne({ where: { id } });
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

  async findDocumentsByFilingId(filingId: string): Promise<Document[]> {
    if (!isUUID(filingId)) throw new Error('Input is not an UUID!');
    const data = await this.documentRepository.find({
      where: { filing: { id: filingId } },
      order: { createdAt: 'DESC' },
    });
    return data;
  }

  async findLatestDocumentByFilingId(
    filingId: string,
  ): Promise<Document | null> {
    if (!isUUID(filingId)) throw new Error('filingId is not an UUID!');
    const data = await this.documentRepository.findOne({
      where: {
        filing: { id: filingId },
        activity: Not(DocumentActivity.REPLY),
        status: Not(DocumentStatus.DRAFT),
      },
      order: { createdAt: 'DESC' },
    });
    console.log(data);
    return data;
  }

  async createDocument(obj: CreateDocumentDTO): Promise<Document> {
    const {
      filingId,
      name,
      detail,
      pdfName,
      docName,
      activity,
      userId,
      status,
      comment,
    } = obj;
    const foundUser = await this.userService.findByUserID(userId);
    if (!foundUser) throw new BadRequestException('User Not Found!');
    const foundFiling = await this.filingService.findByFilingID(filingId);
    if (!foundFiling) throw new BadRequestException('Filing Not Found!');
    const newDocument = new Document();
    newDocument.filing = foundFiling;
    newDocument.name = name;
    newDocument.detail = detail ?? '';
    newDocument.pdfName = pdfName;
    newDocument.docName = docName;
    newDocument.activity = activity;
    newDocument.user = foundUser;
    if (comment) newDocument.comment = comment;
    if (status) {
      newDocument.status = status;
    }

    return await this.documentRepository.save(newDocument);
  }

  async updateDocument(
    docId: string,
    obj: Partial<Document>,
  ): Promise<Document> {
    const foundDoc = await this.documentRepository.findOne({
      where: { id: docId },
    });
    if (!foundDoc) {
      throw new Error(`document not found`);
    }
    return await this.documentRepository.save({ ...foundDoc, ...obj });
  }

  async deleteDocument(id: string): Promise<Document> {
    const foundDocument = await this.findByDocID(id);
    if (!foundDocument) throw new BadRequestException('Document Not Found!');
    await this.documentRepository.remove(foundDocument);
    return foundDocument;
  }

  async reviewDocumentSubmission(
    docId: string,
    updatedStatus: boolean,
  ): Promise<Document> {
    const foundDocument = await this.findByDocID(docId);
    if (!foundDocument) throw new BadRequestException('Document Not Found!');

    const newStatus = updatedStatus
      ? DocumentStatus.APPROVED
      : DocumentStatus.RETURNED;

    const reviewedDocument = await this.updateDocument(docId, {
      status: newStatus,
    }).catch((error) => {
      console.error(error);
      throw new Error('Failed to update document status');
    });

    await this.filingService
      .updateStatus(
        reviewedDocument.filingId,
        updatedStatus ? FilingStatus.APPROVED : FilingStatus.RETURNED,
      )
      .catch((error) => {
        console.error(error);
        throw new Error('Failed to update filing status');
      });

    return reviewedDocument;
  }
}
