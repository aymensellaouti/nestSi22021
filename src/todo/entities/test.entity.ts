import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export  class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
