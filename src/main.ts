import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import initializeMiddlewares from './infra/config/middlewares';

async function bootstrap() {
  const logger = new Logger();
  const env = process.env as NodeJS.ProcessEnv;

  let app = await NestFactory.create(AppModule);
  app = initializeMiddlewares(app);

  await app.listen(env.API_PORT, env.API_HOST).then(() => {
    logger.warn(`Server running on http://${env.API_HOST}:${env.API_PORT}/api`);
  });
}
bootstrap();
