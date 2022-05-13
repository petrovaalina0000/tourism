import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
