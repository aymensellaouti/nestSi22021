import { TodoStatusEnum } from '../enums/TodoStatusEnum';

export class UpdateTodoDto {
  name: string;
  description: string;
  status: TodoStatusEnum;
}
