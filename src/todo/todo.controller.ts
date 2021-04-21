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
  ): Promise<TodoEntity[]> {

    return this.todoService.getTodos(page, nbre);
  }
  @Get('name/:name')
  getTodosByName(
    @Param('name') name: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('nbre', new DefaultValuePipe(10)) nbre: number,
  ): Promise<TodoEntity[]> {
    return this.todoService.getTodosName(name);
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

  @Delete('soft/:id')
  softDeleteTodo(
    @Param('id') id: string
  ): Promise<unknown> {
    return this.todoService.softDelete(id);
  }

  @Delete('criteria')
  deleteTodoByCriteria(
    @Param('id') id: string
  ): Promise<unknown> {
    return this.todoService.deleteTodo(id);
  }

  @Post('restore/:id')
  restoreTodo(
    @Param('id') id: string
  ): Promise<unknown> {
    return this.todoService.restoreTodo(id);
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
  @Get('stats/status')
  statsTodoStatus() {
    return this.todoService.statusStats();
  }

}
