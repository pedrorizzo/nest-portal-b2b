import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/data/basis/repository.base';
import { UserEntity } from '../../entities/client/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
