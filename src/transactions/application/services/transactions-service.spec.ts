import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Account,
  AccountTypes,
  AccountsRepository,
  AccountsService,
} from '../../../accounts';
import { AccountsRepositoryMock } from '../../../accounts/domain/repositories/accounts-repository.mock';
import {
  Transaction,
  TransactionTypes,
  TransactionsRepository,
} from '../../domain';
import { TransactionsRepositoryMock } from '../../domain/repositories/transactions-repository.mock';
import {
  DepositTransactionDTO,
  PixTransactionDTO,
  WithdrawTransactionDTO,
} from '../dtos';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let sut: TransactionsService;

  let testAccounts: Account[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountsRepository,
          useClass: AccountsRepositoryMock,
        },
        {
          provide: TransactionsRepository,
          useClass: TransactionsRepositoryMock,
        },
        TransactionsService,
      ],
    }).compile();

    sut = module.get(TransactionsService);

    const accountsRepository: AccountsRepository =
      module.get(AccountsRepository);

    testAccounts = await accountsRepository.saveMany([
      new Account({
        customer: 'Cliente 1',
        type: AccountTypes.CURRENT,
        number: '0001',
      }),
      new Account({
        customer: 'Cliente 2',
        type: AccountTypes.CURRENT,
        number: '0002',
      }),
    ]);

    testAccounts[0].balance = 20;

    testAccounts[0] = await accountsRepository.save(testAccounts[0]);

    testAccounts[1].balance = 10;

    testAccounts[1] = await accountsRepository.save(testAccounts[1]);

    const repository: TransactionsRepository = module.get(
      TransactionsRepository,
    );

    await repository.save(
      new Transaction({
        to: testAccounts[0],
        type: TransactionTypes.DEPOSIT,
        amount: 10,
      }),
    );
  });

  describe('constructor', () => {
    it('Should be defined', () => {
      expect(sut).toBeDefined();
    });
  });

  describe('deposit', () => {
    it('Should create a deposit transaction', async () => {
      const dto: DepositTransactionDTO = {
        toId: testAccounts[0].id,
        amount: 10,
      };

      const transaction: Transaction = await sut.deposit(dto);

      expect(transaction.to?.id).toEqual(dto.toId);
      expect(transaction.type).toEqual(TransactionTypes.DEPOSIT);
      expect(transaction.amount).toEqual(dto.amount);
    });
  });

  it('Should create a withdraw transaction', async () => {
    const dto: WithdrawTransactionDTO = {
      fromId: testAccounts[0].id,
      amount: 10,
    };

    const transaction: Transaction = await sut.withdraw(dto);

    expect(transaction.from?.id).toEqual(dto.fromId);
    expect(transaction.type).toEqual(TransactionTypes.WITHDRAW);
    expect(transaction.amount).toEqual(dto.amount);
  });

  describe('pix', () => {
    it('Should create a pix transaction', async () => {
      const dto: PixTransactionDTO = {
        fromId: testAccounts[0].id,
        toId: testAccounts[1].id,
        amount: 10,
      };

      const transaction: Transaction = await sut.pix(dto);

      expect(transaction.from?.id).toEqual(dto.fromId);
      expect(transaction.to?.id).toEqual(dto.toId);
      expect(transaction.type).toEqual(TransactionTypes.PIX);
      expect(transaction.amount).toEqual(dto.amount);
    });
  });

  describe('getAll', () => {
    it('Should get all transactions', async () => {
      const transactions: Transaction[] = await sut.getAll();

      expect(transactions.length).toEqual(1);
    });
  });

  describe('getById', () => {
    it('Should get an transaction by ID', async () => {
      await expect(sut.getById('1')).resolves.not.toThrow();
    });

    it('Should throw NotFoundException on inexistent transaction', async () => {
      await expect(sut.getById('')).rejects.toThrow(NotFoundException);
    });
  });
});
