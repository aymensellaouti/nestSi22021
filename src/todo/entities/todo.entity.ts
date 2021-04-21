import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TodoStatusEnum } from '../enums/TodoStatusEnum';
import { TimestampEntity } from '../../genrics/timestamp-entity';

@Entity('todo')
export class TodoEntity extends TimestampEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    length: 50
  })
  name: string;
  @Column({
    length: 255
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting
    })
  status: TodoStatusEnum;
}
