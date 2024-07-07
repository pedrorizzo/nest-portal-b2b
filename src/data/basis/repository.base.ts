import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { BaseEntity } from './entity.base';
import { Injectable, Logger } from '@nestjs/common';
import { ArrayUtils, ObjectUtils } from 'src/shared/utils';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

@Injectable()
export abstract class BaseRepository<T extends BaseEntity> {
  private logger = new Logger(BaseRepository.name);
  private _entity: EntityTarget<T>;

  protected _repository: Repository<T>;
  protected _datasource: DataSource;
  protected _injectTimeStampProperties: boolean;

  constructor(
    entity: EntityTarget<T>,
    dataSource: DataSource,
    timeStampProperties: boolean = true,
  ) {
    this._entity = entity;
    this._datasource = dataSource;
    this._repository = dataSource.getRepository<T>(entity);
    this._injectTimeStampProperties = timeStampProperties;
  }

  async findByPrimaryKey(
    id: string | number,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    try {
      this.logger.log(`findByPrimaryKey: ${id}`);

      if (relations) {
        return this._repository.findOne({
          where: { id: id as any },
          relations,
        });
      } else {
        return this._repository.findOneBy({
          id: id as any,
        });
      }
    } catch (err) {
      this.handleError('findByPrimaryKey', err);
    }
  }

  async find<T>(criteria: FindManyOptions<T>): Promise<T[]> {
    try {
      this.logger.log(`find: ${criteria}`);
      ObjectUtils.ensure(criteria);
      const data = await this._repository.find(criteria as any);
      if (!data) {
        return [];
      }
      return data as any[];
    } catch (err) {
      this.handleError('find', err);
    }
  }

  async findOr<T>(criteria: FindOptionsWhere<T[]>): Promise<T[]> {
    try {
      this.logger.log(`findOr: ${criteria}`);
      ArrayUtils.ensure(criteria);
      const data = await this._repository.find({ where: criteria as any });
      if (!data) {
        return [];
      }
      return data as any[];
    } catch (err) {
      this.handleError('findOr', err);
    }
  }

  async findOne<T>(criteria: FindOptionsWhere<T>): Promise<T> {
    try {
      this.logger.log(`findOne: ${criteria}`);
      ObjectUtils.ensure(criteria);
      const data = await this._repository.findOne(criteria);
      if (!data) {
        return null;
      }
      return data as any;
    } catch (err) {
      this.handleError('findOne', err);
    }
  }

  async save(data: T): Promise<T> {
    try {
      this.logger.log(data);
      const result = await this._repository.save<T>(data);
      return result as T;
    } catch (err) {
      this.handleError('save', err);
    }
    const aftermath = await this._repository.save(data);
    return this.findByPrimaryKey(aftermath.id);
  }

  async update(
    criteria: string | number | FindOptionsWhere<T>,
    data: any,
  ): Promise<T | T[]> {
    try {
      this.logger.log(`update ${criteria}: ${data}`);
      ObjectUtils.ensure(data);
      if (typeof criteria === 'string' || typeof criteria === 'number') {
        await this._repository.update({ id: criteria as any }, data);
        return this.findByPrimaryKey(criteria);
      } else {
        await this._repository.update(criteria, data);
        return this.find(criteria as any);
      }
    } catch (err) {
      this.handleError('update', err);
    }
  }

  async deleteByPrimaryKey(id: string | number): Promise<boolean> {
    try {
      this.logger.log(`deleteByPrimaryKey: ${id}`);
      const result = await this._repository.delete({ id: id as any });
      return result.affected > 0;
    } catch (err) {
      this.handleError('deleteByPrimaryKey', err);
    }
  }

  async executeQueryNative(
    queryText: string,
    isolationLevel: IsolationLevel = 'READ UNCOMMITTED',
  ): Promise<any> {
    const queryRunner = this._datasource.createQueryRunner();

    await queryRunner.startTransaction(isolationLevel);

    try {
      const queryResult = await queryRunner.query(queryText);
      await queryRunner.commitTransaction();
      return queryResult;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.handleError('executeQueryNative', err);
    } finally {
      await queryRunner.release();
    }
  }

  createTransactionManager() {
    const queryRunner = this._datasource.createQueryRunner();
    return {
      start: queryRunner.startTransaction,
      commit: queryRunner.commitTransaction,
      rollback: queryRunner.rollbackTransaction,
      release: queryRunner.release,
    };
  }

  /**
   * Error Handler
   */
  protected handleError(err: any, functionName: string) {
    const message = err instanceof Error ? err.message : err;
    this.logger.error(`${functionName ?? ''}: ${message ?? ''}`);
    throw err;
  }
}
