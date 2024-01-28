import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  SecurityHeaderInterceptor,
  TimeoutInterceptor,
} from 'src/core/interceptors';
import { FilterExceptionIntercaptor } from 'src/core/interceptors/filter-exception.interceptor';
import setupSwagger from './infra/config/documentation';
import * as express from 'express';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const logger = new Logger();
  const env = process.env as NodeJS.ProcessEnv;

  const app = await NestFactory.create(AppModule);

  // Apply global route prefix
  app.setGlobalPrefix('/api');

  // Apply global interceptors
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new SecurityHeaderInterceptor(),
  );

  // Apply global filters
  app.useGlobalFilters(new FilterExceptionIntercaptor());

  // Apply global pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Apply containers
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // General configs
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: false }));
  app.enableCors({ origin: '*' });

  // Swagger documentation
  setupSwagger(app);
  // app = initializeMiddlewares(app);

  await app.listen(env.API_PORT, env.API_HOST).then(() => {
    logger.warn(`Server running on http://${env.API_HOST}:${env.API_PORT}/api`);
  });
}
bootstrap();
