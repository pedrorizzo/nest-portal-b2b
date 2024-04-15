import { CustomBaseEntity } from 'src/data/basis/entity.base';
import { Column, Entity, PrimaryColumn } from 'typeorm';
// import { ClientEntity } from './client.entity';

@Entity('users')
export class UserEntity extends CustomBaseEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid', unique: true })
  id?: string;

  @Column({ name: 'clientId', type: 'varchar' })
  clientId: string;

  @Column({ name: 'document', type: 'varchar', length: 11, unique: true })
  document: string;

  @Column({ name: 'fullName', type: 'varchar', length: 50 })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'birthDate', type: 'timestamp without time zone' })
  birthDate: Date;

  @Column({ name: 'cellphone', type: 'varchar', length: 20, nullable: true })
  cellphone: string;

  @Column({ name: 'isMain', type: 'boolean' })
  isMain: boolean;

  @Column({ name: 'isActive', type: 'boolean' })
  isActive: boolean;

  // @ManyToOne(() => ClientEntity, (e) => e.id)
  // @JoinColumn({ name: 'clientId', referencedColumnName: 'id' })
  // client: ClientEntity;
}
