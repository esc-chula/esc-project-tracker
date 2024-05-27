import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filing } from './Filing.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Filing, { onDelete: 'CASCADE' })
  filingId: Filing;

  @Column()
  name: string;

  @Column()
  activity: string;

  @Column()
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
