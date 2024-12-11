import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database/databaseConfig';
import AuthModule from './modules/auth/auth.module';
import UserModule from './modules/user/user.module';
import TaskModule from './modules/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    TaskModule,
  ],
})
export default class AppModule {}
