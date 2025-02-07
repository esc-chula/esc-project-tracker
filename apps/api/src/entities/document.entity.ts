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

  @Column()
  filingId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: DocumentActivity.CREATE })
  activity: DocumentActivity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @Column({ default: DocumentStatus.DRAFT })
  status: DocumentStatus;

  @Column({ nullable: true })
  detail: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  pdfName: string;

  @Column({ nullable: true })
  docName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
