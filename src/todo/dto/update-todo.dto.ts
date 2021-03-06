import { TodoStatusEnum } from '../enums/TodoStatusEnum';
import { IsIn, IsNotEmpty } from 'class-validator';
import { ErrorMessgaes } from '../../genrics/error-message.common';
import { AddTodoDto } from './add-todo.dto';

export class UpdateTodoDto extends AddTodoDto{
  @IsNotEmpty({
    message: ErrorMessgaes.isEmptyMessage
  })
  @IsIn([
    TodoStatusEnum.waiting,
    TodoStatusEnum.actif,
    TodoStatusEnum.done,
  ])
  status: TodoStatusEnum;
}
