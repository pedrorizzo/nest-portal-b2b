import {
  CreateDateColumn,
  BaseEntity as TypeormBaseEntity,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as newId } from 'uuid';

/**
 * Incldes columns: InseridoEm, ModificadoEm
 */
export abstract class BaseEntity extends TypeormBaseEntity {
  /**
   *  Primary key (strategy must be override)
   */
  id: string;
}

export abstract class CustomBaseEntity extends BaseEntity {
  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp without time zone',
    default: 'now()',
    nullable: false,
  })
  createdAt: string | Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp without time zone',
    nullable: true,
  })
  updatedAt?: null | string | Date;

  @BeforeInsert()
  setId(): void {
    this.id = newId();
  }
}
