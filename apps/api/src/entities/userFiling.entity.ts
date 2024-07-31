import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Filing } from './filing.entity';

@Entity()
export class UserFiling {
  @PrimaryColumn({ name: 'userId', type: 'string' })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @PrimaryColumn({ name: 'filingId', type: 'string' })
  @ManyToOne(() => Filing, {
    onDelete: 'CASCADE',
  })
  filing: Filing;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastOpen: Date;
}
