import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class DocType {
  @PrimaryColumn('uuid')
  projectID: string;

  @Column()
  index_0: number;

  @Column()
  index_1: number;

  @Column()
  index_2: number;

  @Column()
  index_3: number;

  @Column()
  index_4: number;

  @Column()
  index_5: number;

  @Column()
  index_6: number;

  @Column()
  index_7: number;

  @Column()
  index_8: number;

  @Column()
  index_9: number;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'projectID', referencedColumnName: 'projectID' })
  project: Project;
}
