import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocStatus } from '../constant/enum';
import { Project } from './project.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  docID: string;

  @Column()
  name: string;

  @Column()
  Code: string;

  @Column({
    type: 'enum',
    enum: DocStatus,
  })
  status: DocStatus;

  @Column()
  projectCode: string;

  @Column()
  type: number;

  @Column()
  detail: string;

  @Column()
  pdfLink: string;

  @Column()
  docLink: string;

  @Column()
  projectID: string;

  @ManyToOne(() => Project, { cascade: true })
  @JoinColumn({ name: 'projectID', referencedColumnName: 'projectID' })
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
