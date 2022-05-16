import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Tour } from './tour.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour)
  tour: Tour;

  @ManyToOne(() => User)
  user: User;

  @Column()
  persons: number;

  @Column()
  days: number;
}
