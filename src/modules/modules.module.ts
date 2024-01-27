import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule],
  exports: [ClientModule],
})
export class ModulesModule {}
