import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { Todo } from './models/todo';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { ProcessTodoPipe } from './process-todo.pipe';
import { TodoEntity } from './entities/todo.entity';
import { PatchTodoDto } from './dto/patch-todo.dto';

@Controller('todo')

export class TodoController {

  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('nbre', new DefaultValuePipe(10)) nbre: number,
  ): Todo[] {
    console.log('page', page);
    console.log('nbre', nbre);
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(
    @Body(ProcessTodoPipe) todoData: AddTodoDto
  ): Promise<TodoEntity> {
    return this.todoService.addTodo(todoData);
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: string
  ): Todo {
    return this.todoService.getTodoById(id);
  }

  @Delete(':id')
  deleteTodo(
    @Body('id') criterias: PatchTodoDto
  ): Promise<unknown> {
    return this.todoService.deleteTodoByCreterias(criterias);
  }
  @Delete('criteria')
  deleteTodoByCriteria(
    @Param('id') id: string
  ): Promise<unknown> {
    return this.todoService.deleteTodo(id);
  }

  @Put(':id')
  updateTodo(
    @Param('id')id : string,
    @Body() newTodo: PatchTodoDto
  ): Promise<TodoEntity> {
    return this.todoService.putTodo(id, newTodo);
  }
  @Patch(':id')
  patchTodo(
    @Param('id')id : string,
    @Body() newTodo: Partial<UpdateTodoDto>
  ): Todo {
    return this.todoService.patchTodo(id, newTodo);
  }


}
