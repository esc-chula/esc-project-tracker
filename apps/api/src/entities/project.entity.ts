import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  // Must be ENUM
  type: string;

  @Column()
  detail: string;

  // TODO: MANY TO MANY to USER
  //****** */

  @Column()
  reserDate: Date;

  @Column()
  // MUST BE ENUM
  status: string;

  // TODO: ONE TO MANY TO DOCTYPES
  //****** */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
