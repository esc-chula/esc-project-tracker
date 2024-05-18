import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocStatus, DocType } from '../constant/enum';
import { Project } from './project.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column()
  name: string;

  @Column()
  dCode: string; // <== คือไรนะ

  @Column({
    type: 'enum',
    enum: DocStatus,
  })
  status: DocStatus;

  @Column()
  pCode: string; // <== คือไรนะ

  @Column({
    type: 'enum',
    enum: DocType,
  })
  type: DocType;

  @Column()
  detail: string;

  @Column()
  pdfLink: string;

  @Column()
  docLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
