import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  isRead: Boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  title: String;

  @Column()
  message: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
