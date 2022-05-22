import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Image } from './image.entity';

@Entity('tour')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column({ nullable: true })
  hotel: string;

  @Column({ nullable: true })
  price: number;

  @Column()
  star: number;

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];
}
