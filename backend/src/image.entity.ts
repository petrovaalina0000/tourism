import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image: string;
}
