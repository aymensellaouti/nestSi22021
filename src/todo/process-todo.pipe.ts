import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class ProcessTodoPipe implements PipeTransform {
  transform(data: AddTodoDto, metadata: ArgumentMetadata) {
    data.description = 'description : ' + data.description;
    return data;
  }
}
