import { IsNotEmpty,  MaxLength, MinLength } from 'class-validator';
import { ErrorMessgaes } from '../../genrics/error-message.common';

export class AddTodoDto {
  @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
  @MinLength(3, {
    message: ErrorMessgaes.tooShort
  })
  @MaxLength(10, {
    message: ErrorMessgaes.tooLong
  })
  name: string;
  @IsNotEmpty({message: ErrorMessgaes.isEmptyMessage})
  @MinLength(10, {
    message: ErrorMessgaes.tooShort
  })
  description: string;
}
