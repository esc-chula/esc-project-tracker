import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { number } from 'zod';

@Entity()
export class DocumentTypeCount {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column({ type: 'int', default: 0 })
  index_1: number;

  @Column({ type: 'int', default: 0 })
  index_2: number;

  @Column({ type: 'int', default: 0 })
  index_3: number;

  @Column({ type: 'int', default: 0 })
  index_4: number;

  @Column({ type: 'int', default: 0 })
  index_5: number;

  @Column({ type: 'int', default: 0 })
  index_6: number;

  @Column({ type: 'int', default: 0 })
  index_7: number;

  @Column({ type: 'int', default: 0 })
  index_8: number;

  @Column({ type: 'int', default: 0 })
  index_9: number;
}
