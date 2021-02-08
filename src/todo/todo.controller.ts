import { Controller, Get } from '@nestjs/common';
import { Todo } from './models/todo';

@Controller('todo')
export class TodoController {
  todos: Todo [] = [];

  @Get('')
  getTodos(): Todo[] {
    return this.todos;
  }
}
