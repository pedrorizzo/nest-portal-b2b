import { DataSource, EntityTarget, Repository } from 'typeorm';
import { BaseEntity } from './entity.base';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends BaseEntity> {
  private _entity: EntityTarget<T>;
  protected _repository: Repository<T>;
  protected _datasource: any;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this._entity = entity;
    this._datasource = dataSource;
    this._repository = dataSource.getRepository<T>(entity);
  }

  async findByPrimaryKey(id: any): Promise<T> {
    return this._repository.findOne({ where: { id: id } });
  }
}
