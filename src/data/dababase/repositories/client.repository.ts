import { DataSource } from 'typeorm';
import { BaseRepository } from '../../basis/repository.base';
import { ClientEntity } from '../entities/client.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepository extends BaseRepository<ClientEntity> {
  constructor(private dataSource: DataSource) {
    super(ClientEntity, dataSource);
  }
}
