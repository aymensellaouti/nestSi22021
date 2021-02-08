import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {Request} from 'express';

@Controller()
export class AppController {
  users = ['mohamed aziz', 'leonel', 'Nour', 'Sabrine'];
  @Get('users')
  getUsers(
    @Req() request: Request
  ): string[] {
    console.log(request);
    return this.users;
  }
  @Get('user/first')
  getFirsUser(): string {
    return this.users[0];
  }
  @Post('newUser')
  addUser(
    @Query('name') name,
    @Body('firstname') completeBody
    ): string{
    console.log(completeBody);
    this.users.push(name);
    return name;
  }

}
