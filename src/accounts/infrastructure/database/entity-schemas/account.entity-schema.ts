import { EntitySchema } from 'typeorm';
import { Account, AccountTypes } from '../../../domain';

export const AccountSchema: EntitySchema<Account> = new EntitySchema({
  name: Account.name,
  tableName: 'accounts',
  target: Account,
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    customer: {
      type: String,
    },
    type: {
      type: 'enum',
      enum: Object.values(AccountTypes),
    },
    number: {
      type: String,
    },
    balance: {
      type: Number,
      precision: 10,
      scale: 2,
    },
    createdAt: {
      name: 'created_at',
      type: Date,
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: Date,
      updateDate: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: Date,
      deleteDate: true,
    },
  },
  uniques: [{ name: 'UQ_ACCOUNTS_NUMBER', columns: ['number'] }],
});
