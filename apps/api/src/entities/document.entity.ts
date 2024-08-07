import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @Column({ nullable: true })
  filingId: string;

  @Column()
  name: string;

  @Column({ default: DocumentActivity.CREATE })
  activity: DocumentActivity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true, default: DocumentStatus.DRAFT })
  status: DocumentStatus;

  @Column({ nullable: true, default: '' })
  detail: string;

  @Column({ nullable: true, default: '' })
  comment: string;

  @Column()
  pdfName: string;

  @Column()
  docName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
