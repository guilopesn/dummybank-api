import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { createDataSource } from '../../../../testing/create-datasource.function';
import { Account, AccountProps, AccountTypes } from '../../../domain';
import { AccountSchema } from '../entity-schemas';
import { TypeOrmAccountsRepository } from './typeorm.accounts-repository';

describe('TypeOrmAccountsRepository', () => {
  let sut: TypeOrmAccountsRepository;

  let testAccountProps: AccountProps;

  let testAccount: Account;

  beforeEach(async () => {
    const dataSource: DataSource = await createDataSource([AccountSchema]);

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot()],
      providers: [
        { provide: DataSource, useValue: dataSource },
        TypeOrmAccountsRepository,
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    sut = module.get(TypeOrmAccountsRepository);

    testAccountProps = {
      customer: 'Cliente 1',
      type: AccountTypes.CURRENT,
      number: '0001',
    };

    testAccount = await sut.save(new Account(testAccountProps));
  });

  describe('constructor', () => {
    it('Should be defined', () => {
      expect(sut).toBeDefined();
    });
  });

  describe('find', () => {
    it('Should find all accounts', async () => {
      const accounts: Account[] = await sut.find();

      expect(accounts.length).toEqual(1);
    });
  });

  describe('findById', () => {
    it('Should find an account by ID', async () => {
      const account: Account | null = await sut.findById(testAccount.id);

      expect(account).toMatchObject(testAccount);
    });
  });

  describe('findByNumber', () => {
    it('Should find an account by number', async () => {
      const account: Account | null = await sut.findByNumber(
        testAccount.number,
      );

      expect(account).toMatchObject(testAccount);
    });
  });

  describe('save', () => {
    it('Should save an account', async () => {
      const accountProps: AccountProps = {
        customer: 'Cliente 2',
        type: AccountTypes.CURRENT,
        number: '0002',
      };

      const account: Account = await sut.save(new Account(accountProps));

      expect(account).toMatchObject(accountProps);
    });
  });

  describe('saveMany', () => {
    it('Should save many accounts', async () => {
      const accounts: Account[] = await sut.saveMany([
        new Account({
          customer: 'Cliente 2',
          type: AccountTypes.CURRENT,
          number: '0002',
        }),
        new Account({
          customer: 'Cliente 3',
          type: AccountTypes.CURRENT,
          number: '0003',
        }),
      ]);

      expect(accounts.length).toEqual(2);
    });
  });

  describe('delete', () => {
    it('Should delete an account', async () => {
      const account: Account = await sut.delete(testAccount);

      expect(account.deletedAt).not.toBeNull();
      expect(account).toMatchObject(testAccount);
    });
  });

  describe('recover', () => {
    it('Should recover a deleted account', async () => {
      const account: Account = await sut.recover(testAccount);

      expect(account.deletedAt).toBeNull();
      expect(account).toMatchObject(testAccount);
    });
  });
});
