import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProj } from './userProj.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  studentID: string;

  @Column()
  password: string;

  @OneToMany(
    () => UserProj,
    (userProj) => {
      userProj.user;
    },
  )
  userProj: UserProj[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
