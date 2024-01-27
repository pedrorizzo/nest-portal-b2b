import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CustomBaseEntity } from '../../basis/entity.base';

@Entity('client')
export class ClientEntity extends CustomBaseEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', unique: true })
  id: string;

  @Column({ name: 'corporateName', type: 'varchar', length: 50 })
  corporateName: string;

  @Column({ name: 'fantasyName', type: 'varchar', length: 50 })
  fantasyName: string;

  @Column({ name: 'document', type: 'varchar', length: 14, unique: true })
  document: string;

  @Column({ name: 'email', type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'cellphone', type: 'varchar', length: 20, nullable: true })
  cellphone: string;

  @Column({ name: 'isActive', type: 'bit', default: 1 })
  isActive: boolean;
}
