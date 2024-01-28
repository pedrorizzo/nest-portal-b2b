import { Module } from '@nestjs/common';
import { ClientDataModule } from 'src/data/dababase/modules';
import { HasClientValidator } from '../client/validators/has-client.validator';

@Module({
  imports: [ClientDataModule],
  providers: [HasClientValidator],
})
export class ValidatorsModule {}
