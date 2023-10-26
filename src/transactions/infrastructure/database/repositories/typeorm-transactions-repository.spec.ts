import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Account,
  AccountTypes,
  AccountsRepository,
} from '../../../../accounts';
import {
  AccountSchema,
  TypeOrmAccountsRepository,
} from '../../../../accounts/infrastructure';
import {
  Transaction,
  TransactionProps,
  TransactionTypes,
} from '../../../domain';
import { TransactionSchema } from '../entity-schemas';
import { TypeOrmTransactionsRepository } from './typeorm.transactions-repository';
import { createDataSource } from '../../../../testing/create-datasource.function';
import { DataSource } from 'typeorm';

describe('TypeOrmTransactionsRepository', () => {
  let sut: TypeOrmTransactionsRepository;

  let testAccount: Account;

  let testTransactionProps: TransactionProps;

  let testTransaction: Transaction;

  beforeEach(async () => {
    const dataSource: DataSource = await createDataSource([
      AccountSchema,
      TransactionSchema,
    ]);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          entities: [AccountSchema, TransactionSchema],
        }),
      ],
      providers: [TypeOrmAccountsRepository, TypeOrmTransactionsRepository],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    sut = module.get(TypeOrmTransactionsRepository);

    const accountsRepository: AccountsRepository = module.get(
      TypeOrmAccountsRepository,
    );

    testAccount = await accountsRepository.save(
      new Account({
        customer: 'Cliente 4',
        type: AccountTypes.CURRENT,
        number: '0004',
      }),
    );

    testTransactionProps = {
      to: testAccount,
      type: TransactionTypes.DEPOSIT,
      amount: 10,
    };

    testTransaction = await sut.save(new Transaction(testTransactionProps));
  });

  describe('constructor', () => {
    it('Should be defined', () => {
      expect(sut).toBeDefined();
    });
  });

  describe('find', () => {
    it('Should find all transactions', async () => {
      const transactions: Transaction[] = await sut.find();

      expect(transactions.length).toEqual(1);
    });
  });

  describe('findById', () => {
    it('Should find an transaction by ID', async () => {
      const transaction: Transaction | null = await sut.findById(
        testTransaction.id,
      );

      expect(transaction).not.toBeNull();
    });
  });

  describe('save', () => {
    it('Should save an transaction', async () => {
      const transactionProps: TransactionProps = {
        to: testAccount,
        type: TransactionTypes.DEPOSIT,
        amount: 10,
      };

      const transaction: Transaction = await sut.save(
        new Transaction(transactionProps),
      );

      expect(transaction).toMatchObject(transactionProps);
    });
  });
});
