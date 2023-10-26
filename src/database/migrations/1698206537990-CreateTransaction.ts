import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TransactionTypes } from '../../transactions';

export class CreateTransaction1698206537990 implements MigrationInterface {
  private readonly table: Table = new Table({
    name: 'transactions',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        primaryKeyConstraintName: 'PK_TRANSACTIONS_ID',
      },
      {
        name: 'type',
        type: 'enum',
        enum: Object.values(TransactionTypes),
        enumName: 'TRANSACTION_TYPES',
      },
      {
        name: 'from_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'to_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'amount',
        type: 'decimal',
        precision: 10,
        scale: 2,
      },
      {
        name: 'at_date',
        type: 'timestamp',
        default: 'now()',
      },
    ],
    foreignKeys: [
      {
        name: 'FK_FROM_ID_ACCOUNTS_ID',
        columnNames: ['from_id'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
      },
      {
        name: 'FK_TO_ID_ACCOUNTS_ID',
        columnNames: ['to_id'],
        referencedTableName: 'accounts',
        referencedColumnNames: ['id'],
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
