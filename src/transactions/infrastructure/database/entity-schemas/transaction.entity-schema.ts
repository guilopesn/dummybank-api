import { EntitySchema } from 'typeorm';
import { Account } from '../../../../accounts';
import { Transaction, TransactionTypes } from '../../../domain';

export const TransactionSchema: EntitySchema<Transaction> =
  new EntitySchema<Transaction>({
    name: Transaction.name,
    tableName: 'transactions',
    target: Transaction,
    columns: {
      id: {
        type: 'uuid',
        primary: true,
        generated: 'uuid',
      },
      type: {
        type: 'enum',
        enum: Object.values(TransactionTypes),
      },
      amount: {
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: {
          to: (value: number): number => value,
          from: (value: string): number => parseFloat(value),
        },
      },
      atDate: {
        name: 'at_date',
        type: 'timestamp',
        createDate: true,
      },
    },
    relations: {
      from: {
        type: 'many-to-one',
        joinColumn: {
          name: 'from_id',
        },
        target: Account.name,
        nullable: true,
      },
      to: {
        type: 'many-to-one',
        joinColumn: {
          name: 'to_id',
        },
        target: Account.name,
        nullable: true,
      },
    },
  });
