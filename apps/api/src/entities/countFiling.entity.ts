import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class CountFiling {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  count: number;
}
