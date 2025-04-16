import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { FilingSubType } from '@repo/shared';
import { User } from './user.entity';
import { DocumentTypeTwo } from '../constant/document/document-type-two';
import { DocumentTypeZero } from '../constant/document/document-type-zero';

@Entity()
export class Gendoc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'SET NULL' })
  project: Project;

  @Column({ nullable: true })
  projectId: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column()
  filingCode: string;

  @Column()
  type: number;

  @Column({
    type: 'enum',
    enum: FilingSubType,
    nullable: true,
  })
  subType: FilingSubType;

  @Column()
  projectCode: string;

  @Column({ type: 'jsonb', nullable: true })
  data: DocumentTypeZero | DocumentTypeTwo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
