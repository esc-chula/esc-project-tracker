import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class UserProj {
  @PrimaryColumn('uuid')
  userID: string;

  @PrimaryColumn('uuid')
  projectID: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userID', referencedColumnName: 'userID' })
  user: User;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectID', referencedColumnName: 'projectID' })
  project: Project;
}
