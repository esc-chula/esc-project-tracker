import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import {
  FilingSubType,
  DocumentTypeZero,
  DocumentTypeTwo,
  FilingType,
} from '@repo/shared';
import { User } from './user.entity';

@Entity()
export class Gendoc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'SET NULL' })
  project: Project;

  @Column({ nullable: true })
  projectId: string;

  @Column({ nullable: true })
  customProjectName: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column()
  filingCode: string;

  @Column({
    type: 'enum',
    enum: FilingType,
    nullable: false,
  })
  type: FilingType;

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
