import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      TodoEntity
    ])
  ]
})
export class TodoModule {}
