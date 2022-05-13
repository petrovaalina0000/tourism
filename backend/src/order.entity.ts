import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Tour } from './tour.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Tour)
  @JoinTable()
  tour: Tour;

  @ManyToMany(() => User)
  @JoinTable()
  user: User;

  @Column()
  persons: number;

  @Column()
  days: number;
}
