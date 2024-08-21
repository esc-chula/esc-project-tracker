import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  studentId: string;

  @Column({
    type: 'enum',
    enum: ['student', 'esc', 'admin'],
    default: 'student',
    nullable: false,
  })
  role: 'student' | 'esc' | 'admin';

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
