import { Column, PrimaryColumn } from 'typeorm';

export class DocNum {
  @PrimaryColumn({ default: '1' })
  id: string;

  @Column({ default: 0 })
  docNum: number;
  //contain only 1 record that has docNum as an attr
}
