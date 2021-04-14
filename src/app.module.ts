import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test.module';
import { Test2Module } from './test2/test2.module';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { secondMiddleware } from './middlewares/second.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity';

@Module({
  imports: [TestModule, Test2Module, TodoModule, SharedModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'si2Nest2021',
      entities: [TodoEntity],
      synchronize: true,
      logging: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    HelmetMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware)
      .forRoutes('')
      .apply(FirstMiddleware)
      .forRoutes('')
    ;
  }
}
