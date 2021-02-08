import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test.module';
import { Test2Module } from './test2/test2.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TestModule, Test2Module, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
