import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocStatus, DocType } from '../constant/enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dCode: string;

  @Column({
    type: 'enum',
    enum: DocStatus,
  })
  status: DocStatus;

  @Column()
  pCode: string;

  //TODO: MANY TO ONE to PROJECT
  //****** */

  @Column({
    type: 'enum',
    enum: DocType,
  })
  type: DocType;

  @Column()
  detail: string;

  @Column()
  pdfLink: string;

  @Column()
  docLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
