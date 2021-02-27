import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { Todo } from './models/todo';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(
    @Body() todoData: AddTodoDto
  ): Todo {
    return this.todoService.addTodo(todoData);
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: string
  ): Todo {
    return this.searchTodo(id);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string
  ): { message: string } {
    const size = this.todos.length;
    this.todos = this.todos.filter(
      (todo) => todo.id != id
    );
    if (size === this.todos.length) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return {message: `le todo d'id ${id} a été supprimé avec succès`};
  }

  @Put(':id')
  updateTodo(
    @Param('id')id : string,
    @Body() newTodo: UpdateTodoDto
  ): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description;
    todo.name = newTodo.name;
    todo.status = newTodo.status;
    return todo;
  }
  @Patch(':id')
  patchTodo(
    @Param('id')id : string,
    @Body() newTodo: Partial<UpdateTodoDto>
  ): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description ?? todo.description;
    todo.name = newTodo.name ?? todo.name;
    todo.status = newTodo.status ?? todo.status;
    return todo;
  }

  searchTodo(id): Todo {
    const todo: Todo =  this.todos.find(
      (todo) => todo.id === id
    );
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
