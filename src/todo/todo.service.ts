import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo';
import { TodoStatusEnum } from './enums/TodoStatusEnum';
import { AddTodoDto } from './dto/add-todo.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TodoService {
  todos: Todo [] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todoData: AddTodoDto) {
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
}
