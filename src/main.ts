import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { FilterExceptionIntercaptor } from './core/interceptors/filter-exception.interceptor';
import {
  SecurityHeaderInterceptor,
  TimeoutInterceptor,
} from './core/interceptors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const env = process.env as NodeJS.ProcessEnv;

  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new FilterExceptionIntercaptor());

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new SecurityHeaderInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: false }));
  app.enableCors({ origin: '*' });

  await app.listen(env.API_PORT, env.API_HOST).then(() => {
    logger.warn(`Server running on http://${env.API_HOST}:${env.API_PORT}/api`);
  });
}
bootstrap();
