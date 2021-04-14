import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './models/todo';
import { TodoStatusEnum } from './enums/TodoStatusEnum';
import { AddTodoDto } from './dto/add-todo.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TodoService {
  todos: Todo [] = [];

  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}

  searchTodo(id): Todo {
    const todo: Todo =  this.todos.find(
      (todo) => todo.id === id
    );
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  async addTodo(todoData: AddTodoDto) {
      // return f();
      return await this.todoRepository.save(todoData);
  }

    addFakeTodo(todoData: AddTodoDto) {
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

  getTodoById(id: string): Todo {
    return this.searchTodo(id);
  }

  async deleteTodo(id: string): Promise<unknown> {
    const deletedTodo = await this.todoRepository.delete(id);
    if(! deletedTodo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    } else {
      return deletedTodo;
    }
  }
  async deleteTodoByCreterias(criterias): Promise<unknown> {
    const deletedTodo = await this.todoRepository.delete({ ...criterias });
    if(! deletedTodo) {
      throw new NotFoundException(`Aucun Todo trouvé`);
    } else {
      return deletedTodo;
    }
  }

  patchTodo(id: string, newTodo: Partial<UpdateTodoDto>): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description ?? todo.description;
    todo.name = newTodo.name ?? todo.name;
    todo.status = newTodo.status ?? todo.status;
    return todo;
  }

  async putTodo(id: string, newTodo: UpdateTodoDto): Promise<TodoEntity> {
    const updatedTodo = await this.todoRepository.preload({
      id,
      ...newTodo
  });
    console.log('Valeur de retour de preload : ', updatedTodo);
  if (! updatedTodo) {
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
  } else {
    return await this.todoRepository.save(updatedTodo);
  }
  }

}
