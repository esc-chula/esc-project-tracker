import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { FilingStatus, FilingSubType } from '@repo/shared';
import { User } from './user.entity';

@Entity()
export class Filing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ nullable: true })
  projectId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FilingStatus,
  })
  status: FilingStatus;

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

  // @Column()
  // tel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
