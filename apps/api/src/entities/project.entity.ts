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
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  type: number;

  @Column()
  detail: string;

  @Column()
  reserveDate: Date;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  status: ProjectStatus;

  @OneToOne(() => DocType, { cascade: true })
  @JoinColumn({ name: 'id' })
  docType: DocType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
