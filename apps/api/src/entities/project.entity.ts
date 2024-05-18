import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectStatus } from '../constant/enum';
import { DocType } from './docType.entity';
import { Document } from './document.entity';
import { UserProj } from './userProj.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  projectID: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  type: number;

  @Column()
  detail: string;

  @Column()
  reserDate: Date;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  status: ProjectStatus;

  @OneToMany(() => UserProj, (userProj) => userProj.project)
  userProj: UserProj[];

  @OneToMany(() => Document, (document) => document.project)
  documents: Document[];

  @OneToOne(() => DocType, { cascade: true })
  docType: DocType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
