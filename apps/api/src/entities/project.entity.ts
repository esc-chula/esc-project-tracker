import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectStatus, ProjectType } from '../constant/enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({})
  projectCode: string;

  @Column({
    type: 'enum',
    enum: ProjectType,
  })
  type: ProjectType;

  @Column({
    nullable: true,
  })
  detail: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  reserveDate: Date;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.CONTINUE,
  })
  status: ProjectStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
