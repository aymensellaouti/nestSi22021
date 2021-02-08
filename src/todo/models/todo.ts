import { TodoStatusEnum } from '../enums/TodoStatusEnum';


export class Todo {
  id: string;
  name: string;
  description: string;
  date: Date;
  status: TodoStatusEnum;
}
