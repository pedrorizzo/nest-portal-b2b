import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClientTable1706312741054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'client',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'corporateName',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'fantasyName',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'document',
            type: 'varchar',
            length: '14',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '20',
            isUnique: true,
          },
          {
            name: 'cellphone',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp without time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp without time zone',
            default: null,
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(`
      INSERT INTO client ("id", "corporateName", "fantasyName", "document", "email", "phone", "cellphone", "isActive", "createdAt", "updatedAt")
      VALUES (
        '83979d78-14ac-44bd-a6c6-355bff8cdef3',
        'Info Tecnologia e Sistemas LTDA',
        'Info Tecnologia',
        '07777542000114',
        'rh@infosistemas.com.br',
        '3199618717',
        '3199618717',
        true,
        now(),
        NULL
      ),
      (
        '764736ba-5917-4be6-b4d9-215189e5d9c0',
        'Enrico e Aparecida Restaurante Ltda',
        'Foie Gras',
        '88767811000163',
        'contato@foiegras.com.br',
        '1437526655',
        '14988010723',
        true,
        now(),
        NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('client');
  }
}
