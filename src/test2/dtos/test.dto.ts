import { IsEmail, IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { ErrorMessgaes } from '../../genrics/error-message.common';

export class TestDto {

  @IsNumber()
  @IsNotEmpty({
    message: ErrorMessgaes.isEmptyMessage
  })
  id: number;

  @IsNotEmpty({
    message: ErrorMessgaes.isEmptyMessage
  })
  name: string;

  @IsNotEmpty(
    {
      message: ErrorMessgaes.isEmptyMessage
    }
  )
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: ErrorMessgaes.isEmptyMessage
  })
  @IsIn(['user', 'admin'])
  role: string;
}
