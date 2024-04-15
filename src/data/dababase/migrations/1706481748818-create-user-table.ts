import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1706481748818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'clientId',
            type: 'varchar',
          },
          {
            name: 'document',
            type: 'varchar',
            length: '11',
            isUnique: true,
          },
          {
            name: 'fullName',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '200',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'timestamp without time zone',
          },
          {
            name: 'cellphone',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'isMain',
            type: 'boolean',
            default: false,
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
        foreignKeys: [
          {
            name: 'FK_users_client_id',
            columnNames: ['clientId'],
            referencedTableName: 'client',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );

    await queryRunner.query(`
      INSERT INTO users ("id", "clientId", "document", "fullName", "email", "password", "birthDate", "cellphone", "isMain", "isActive", "createdAt", "updatedAt")
      VALUES (
        'e099bd12-1432-488a-94ca-e930100ee9af',
        '83979d78-14ac-44bd-a6c6-355bff8cdef3',
        '73530261629',
        'Marcelo Alvarenga',
        'info.marcelo@infosistemas.com.br',
        '$2a$12$T1wOP6jg93jf/dqVA64Ma.86OTklnMGUeNh94A.Q.6dhTtD.vxNHm',
        '1977-02-23 20:47:48.402',
        NULL,
        true,
        true,
        now(),
        NULL
      ),
      (
        '86ae6e8b-48c6-4528-b268-3de969b75d0c',
        '83979d78-14ac-44bd-a6c6-355bff8cdef3',
        '38637950671',
        'Lucas Maia',
        'info.lucas@infosistemas.com.br',
        '$2a$12$T1wOP6jg93jf/dqVA64Ma.86OTklnMGUeNh94A.Q.6dhTtD.vxNHm',
        '1983-11-02 12:33:48.402',
        NULL,
        false,
        true,
        now(),
        NULL
      ),
      (
        '9cf62b21-646b-4969-8497-fe044424cc75',
        '764736ba-5917-4be6-b4d9-215189e5d9c0',
        '29939680686',
        'Mateus Carlos Henry da Mota',
        'mateus.mota@foigras.com.br',
        '$2a$12$T1wOP6jg93jf/dqVA64Ma.86OTklnMGUeNh94A.Q.6dhTtD.vxNHm',
        '1990-10-18 12:33:48.402',
        NULL,
        true,
        true,
        now(),
        NULL
      ),
      (
        'a4005014-1009-4d8e-bd1b-3351b1bca391',
        '764736ba-5917-4be6-b4d9-215189e5d9c0',
        '70497565633',
        'Bruna Helena Luzia Sales',
        'bruna.sales@foigras.com.br',
        '$2a$12$T1wOP6jg93jf/dqVA64Ma.86OTklnMGUeNh94A.Q.6dhTtD.vxNHm',
        '1993-08-07 12:33:48.402',
        NULL,
        false,
        true,
        now(),
        NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
