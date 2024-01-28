import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      host: process.env.DATABASE_HOST,
      type: 'postgres',
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectTimeoutMS: 60000,
      migrationsRun: true,
      logging: true,
      logger: 'file',
      entities: [__dirname + '/entities/*.js'],
      migrations: [__dirname + '/migrations/*.js'],
      migrationsTableName: 'nest_b2b_migrations',
    }),
  ],
})
export class DatabaseModule {}
