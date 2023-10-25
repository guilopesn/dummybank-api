import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { AccountTypes } from '@/accounts';

export class CreateAccount1698198221747 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'accounts',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        primaryKeyConstraintName: 'PK_ACCOUNTS_ID',
      },
      {
        name: 'customer',
        type: 'varchar',
      },
      {
        name: 'type',
        type: 'enum',
        enum: Object.values(AccountTypes),
        enumName: 'ACCOUNT_TYPES',
      },
      {
        name: 'number',
        type: 'varchar',
      },
      {
        name: 'balance',
        type: 'decimal',
        precision: 10,
        scale: 2,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
    uniques: [
      {
        name: 'UQ_ACCOUNTS_NUMBER',
        columnNames: ['number'],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
