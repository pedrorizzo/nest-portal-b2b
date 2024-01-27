import { ClientServiceContract } from './contract/client-service-contract';
import { Module } from '@nestjs/common';
import { ClientDataModule } from 'src/data/dababase/modules';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [ClientDataModule],
  providers: [
    {
      provide: ClientServiceContract,
      useClass: ClientService,
    },
  ],
  controllers: [ClientController],
})
export class ClientModule {}
