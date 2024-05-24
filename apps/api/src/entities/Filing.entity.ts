import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { FillingStatus } from '../constant/enum';
import { User } from './user.entity';

@Entity()
export class Filing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FillingStatus,
  })
  status: FillingStatus;

  @Column()
  fillingCode: string;

  @Column()
  type: number;

  @Column()
  projectCode: string;

  @Column()
  documentCode: string;

  @Column()
  type: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
