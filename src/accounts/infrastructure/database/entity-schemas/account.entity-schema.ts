import { EntitySchema } from 'typeorm';
import { Account, AccountTypes } from '../../../domain';

export const AccountSchema: EntitySchema<Account> = new EntitySchema({
  name: Account.name,
  tableName: 'accounts',
  target: Account,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    customer: {
      type: 'varchar',
    },
    type: {
      type: 'enum',
      enum: Object.values(AccountTypes),
    },
    number: {
      type: 'varchar',
    },
    balance: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      transformer: {
        to: (value: number): number => value,
        from: (value: string): number => parseFloat(value),
      },
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      updateDate: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp',
      deleteDate: true,
    },
  },
  uniques: [{ name: 'UQ_ACCOUNTS_NUMBER', columns: ['number'] }],
});
