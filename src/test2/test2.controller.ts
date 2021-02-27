import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { TodoService } from '../todo/todo.service';

@Controller('test2')
export class Test2Controller {
  constructor(private todoService: TodoService) {
  }
  @Get(':id')
  getTodoSize(
    @Param('id', ParseIntPipe) id: number
  ): number {
    console.log(id);
    console.log(typeof(id));
    return this.todoService.getTodos().length;
  }
}
