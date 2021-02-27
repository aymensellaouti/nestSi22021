import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { Todo } from './models/todo';
import { TodoStatusEnum } from './enums/TodoStatusEnum';
import { v4 as uuidv4 } from 'uuid';

@Controller('todo')
export class TodoController {
  todos: Todo [] = [];

  @Get('')
  getTodos(): Todo[] {
    return this.todos;
  }
  @Post()
  addTodo(
    @Body() todoData
  ): Todo {
    // Destructring
    const {name, description} = todoData;
    /*
    * 1- Récupérer les infos envoyés par le user avec @Body
    * 2- Créer (instanicer) un todo
    * 3- Ajouter les infos manquantes
    * 4- L'ajouter dans le tableau
    * 5- Retourner l'objet todo crée
    * */
    const todo = new Todo();
    todo.description = description;
    todo.name = name;
    todo.date = new Date();
    todo.status = TodoStatusEnum.waiting;
    todo.id = uuidv4();
    this.todos.push(todo);
    return todo;
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
    @Body() newTodo: Todo
  ): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description;
    todo.name = newTodo.name;
    todo.date = newTodo.date;
    todo.status = newTodo.status;
    return todo;
  }
  @Patch(':id')
  patchTodo(
    @Param('id')id : string,
    @Body() newTodo: Partial<Todo>
  ): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description ?? todo.description;
    todo.name = newTodo.name ?? todo.name;
    todo.date = newTodo.date ?? todo.date;
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
