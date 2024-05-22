import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocStatus } from '../constant/enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: DocStatus,
  })
  status: DocStatus;

  @Column()
  projectCode: string;

  @Column()
  documentCode: string;

  @Column()
  type: number;

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
