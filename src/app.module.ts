import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ConfigModule.forRoot(), DataModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
