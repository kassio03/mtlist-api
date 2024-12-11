import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import GenericExceptionFilter from './common/utils/GenericException.filter';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import ExcludeInterceptor from './common/utils/exclude.interceptor';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GenericExceptionFilter());
  app.useGlobalInterceptors(new ExcludeInterceptor());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
