import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class UserProj {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column()
  projectId: string;

  @Column({ type: 'timestamp', nullable: true })
  lastOpen?: Date;
}
