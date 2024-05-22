import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { UserService } from '../user_/user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private readonly userService: UserService,
  ) {}

  findByDocID(docID: string): Promise<Document> | undefined {
    return this.documentRepository.findOne({ where: { docID } });
  }
}