import { Test, TestingModule } from '@nestjs/testing';
import {
  Account,
  AccountTypes,
  AccountsRepository,
  AccountsService,
} from '../../../accounts';
import { AccountsRepositoryMock } from '../../../accounts/domain/repositories/accounts-repository.mock';
import {
  DepositTransactionDTO,
  PixTransactionDTO,
  TransactionsService,
  WithdrawTransactionDTO,
} from '../../application';
import {
  Transaction,
  TransactionTypes,
  TransactionsRepository,
} from '../../domain';
import { TransactionsRepositoryMock } from '../../domain/repositories/transactions-repository.mock';
import { TransactionsController } from './transactions.controller';

describe('TransactionsController', () => {
  let sut: TransactionsController;

  let testAccounts: Account[];

  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: AccountsRepository,
          useClass: AccountsRepositoryMock,
        },
        AccountsService,
        {
          provide: TransactionsRepository,
          useClass: TransactionsRepositoryMock,
        },
        TransactionsService,
      ],
    }).compile();

    sut = module.get(TransactionsController);

    service = module.get(TransactionsService);

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
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'deposit');

      const dto: DepositTransactionDTO = {
        toId: testAccounts[0].id,
        amount: 10,
      };

      await sut.deposit(dto);

      expect(spy).toBeCalledWith(dto);
    });
  });

  describe('withdraw', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'withdraw');

      const dto: WithdrawTransactionDTO = {
        fromId: testAccounts[0].id,
        amount: 10,
      };

      await sut.withdraw(dto);

      expect(spy).toBeCalledWith(dto);
    });
  });

  describe('pix', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'pix');

      const dto: PixTransactionDTO = {
        fromId: testAccounts[0].id,
        toId: testAccounts[1].id,
        amount: 10,
      };

      await sut.pix(dto);

      expect(spy).toBeCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('Should call service', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'getAll');

      await sut.getAll();

      expect(spy).toBeCalled();
    });
  });

  describe('getById', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'getById');

      await sut.getById('1');

      expect(spy).toBeCalledWith('1');
    });
  });
});
