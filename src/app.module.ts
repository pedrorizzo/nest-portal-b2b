import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { ModulesModule } from './modules/modules.module';
import { ValidatorsModule } from './modules/validators/validators.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DataModule,
    ModulesModule,
    ValidatorsModule,
  ],
  providers: [ValidatorsModule],
})
export class AppModule {}
