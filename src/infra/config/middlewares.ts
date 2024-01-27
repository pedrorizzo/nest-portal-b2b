import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  SecurityHeaderInterceptor,
  TimeoutInterceptor,
} from 'src/core/interceptors';
import { FilterExceptionIntercaptor } from 'src/core/interceptors/filter-exception.interceptor';
import * as express from 'express';
import setupSwagger from './documentation';

export default (app: INestApplication): INestApplication => {
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

  // General configs
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: false }));
  app.enableCors({ origin: '*' });

  // Swagger documentation
  setupSwagger(app);

  return app;
};
