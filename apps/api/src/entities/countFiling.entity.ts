import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class CountFiling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 0,
  })
  type_0_count: number;

  @Column({
    default: 0,
  })
  type_1_count: number;

  @Column({
    default: 0,
  })
  type_2_count: number;

  @Column({
    default: 0,
  })
  type_3_count: number;

  @Column({
    default: 0,
  })
  type_4_count: number;

  @Column({
    default: 0,
  })
  type_5_count: number;

  @Column({
    default: 0,
  })
  type_6_count: number;

  @Column({
    default: 0,
  })
  type_7_count: number;

  @Column({
    default: 0,
  })
  type_8_count: number;

  @Column({
    default: 0,
  })
  type_9_count: number;

  @OneToOne(() => Project, { onDelete: 'CASCADE' })
  project: Project;
}
