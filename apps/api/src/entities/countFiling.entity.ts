import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CountFiling {
  @PrimaryColumn()
  id: string;

  @Column({ default: 0 })
  count: number;
}
