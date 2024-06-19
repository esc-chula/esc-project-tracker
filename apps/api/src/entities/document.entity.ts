import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filing } from './filing.entity';
import { DocumentActivity } from '../constant/enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Filing, { onDelete: 'CASCADE' })
  filingId: Filing;

  @Column()
  name: string;

  @Column()
  activity: DocumentActivity;

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
