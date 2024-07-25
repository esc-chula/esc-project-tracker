import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filing } from './filing.entity';
import { DocumentActivity, DocumentStatus } from '../constant/enum';
import { User } from './user.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Filing, { onDelete: 'CASCADE' })
  filing: Filing;

  @Column()
  name: string;

  @Column()
  activity: DocumentActivity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  status: DocumentStatus;

  @Column({ nullable: true, default: '' })
  detail: string;

  @Column()
  pdfLink: string;

  @Column()
  docLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
