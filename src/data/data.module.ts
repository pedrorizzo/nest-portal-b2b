import { Module } from '@nestjs/common';
import { DatabaseModule } from './dababase/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class DataModule {}
