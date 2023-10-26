import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Account,
  AccountProps,
  AccountTypes,
  AccountsRepository,
} from '../../domain';
import { AccountsRepositoryMock } from '../../domain/repositories/accounts-repository.mock';
import { UpdateAccountDTO } from '../dtos';
import { AccountsService } from './accounts.service';

describe('AccountsService', () => {
  let sut: AccountsService;

  let repository: AccountsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AccountsRepository, useClass: AccountsRepositoryMock },
        AccountsService,
      ],
    }).compile();

    sut = module.get(AccountsService);

    repository = module.get(AccountsRepository);

    await repository.save(
      new Account({
        customer: 'Cliente 1',
        type: AccountTypes.CURRENT,
        number: '0001',
      }),
    );

    await repository.save(
      new Account({
        customer: 'Cliente 2',
        type: AccountTypes.CURRENT,
        number: '0002',
      }),
    );
  });

  describe('constructor', () => {
    it('Should be defined', () => {
      expect(sut).toBeDefined();
    });
  });

  describe('create', () => {
    it('Should create an account', async () => {
      const accountProps: AccountProps = {
        customer: 'Cliente 3',
        type: AccountTypes.CURRENT,
        number: '0003',
      };

      const account: Account = await sut.create(new Account(accountProps));

      expect(account.createdAt).toBeDefined();
      expect(account).toMatchObject(accountProps);
    });

    it('Should throw BadRequestException on already existent number', async () => {
      await expect(
        sut.create(
          new Account(
            new Account({
              customer: 'Cliente 1',
              type: AccountTypes.CURRENT,
              number: '0001',
            }),
          ),
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAll', () => {
    it('Should get all accounts', async () => {
      const accounts: Account[] = await sut.getAll();

      expect(accounts.length).toEqual(2);
    });
  });

  describe('getById', () => {
    it('Should get an account by ID', async () => {
      await expect(sut.getById('1')).resolves.not.toThrow();
    });

    it('Should throw NotFoundException on inexistent account', async () => {
      await expect(sut.getById('')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getManyByIds', () => {
    it('Should get many accounts by IDs', async () => {
      const foundAccounts: Account[] = await sut.getManyByIds(['1', '2']);

      expect(foundAccounts.length).toEqual(2);
    });
  });

  describe('getByNumber', () => {
    it('Should get an account by number', async () => {
      await expect(sut.getByNumber('0001')).resolves.not.toThrow();
    });

    it('Should throw NotFoundException on inexistent account', async () => {
      await expect(sut.getByNumber('')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('Should update an account', async () => {
      const dto: UpdateAccountDTO = {
        customer: 'Cliente 11',
        number: '00011',
      };

      const account: Account = await sut.update(dto, '1');

      expect(account.updatedAt).toBeDefined();
      expect(account).toMatchObject(dto);
    });
  });

  describe('delete', () => {
    it('Should delete an account', async () => {
      const account: Account = await sut.delete('1');

      expect(account.deletedAt).not.toBeNull();
    });
  });

  describe('recover', () => {
    it('Should recover a deleted account', async () => {
      const account: Account = await sut.recover('1');

      expect(account.deletedAt).toBeNull();
    });
  });

  describe('deposit', () => {
    it('Should deposit an amount on an account', async () => {
      await sut.deposit(10, '1');

      const account: Account = await sut.getById('1');

      expect(account.balance).toEqual(10);
    });
  });

  describe('withdraw', () => {
    it('Should withdraw an amount from an account', async () => {
      await sut.deposit(20, '1');

      await sut.withdraw(10, '1');

      const account: Account = await sut.getById('1');

      expect(account.balance).toEqual(10);
    });
  });

  describe('pix', () => {
    it('Should transfer an amount from an account to another', async () => {
      await sut.deposit(20, '1');

      await sut.pix(10, '1', '2');

      const fromAccount: Account = await sut.getById('1');

      const toAccount: Account = await sut.getById('2');

      expect(fromAccount.balance).toEqual(10);
      expect(toAccount.balance).toEqual(10);
    });
  });
});
