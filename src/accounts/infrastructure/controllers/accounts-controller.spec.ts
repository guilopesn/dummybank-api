import { Test, TestingModule } from '@nestjs/testing';
import {
  AccountsService,
  CreateAccountDTO,
  UpdateAccountDTO,
} from '../../application';
import { Account, AccountTypes, AccountsRepository } from '../../domain';
import { AccountsRepositoryMock } from '../../domain/repositories/accounts-repository.mock';
import { AccountsController } from './accounts.controller';

describe('AccountsController', () => {
  let sut: AccountsController;

  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        { provide: AccountsRepository, useClass: AccountsRepositoryMock },
        AccountsService,
      ],
    }).compile();

    sut = module.get(AccountsController);

    service = module.get(AccountsService);

    await service.create(
      new Account({
        customer: 'Cliente 1',
        type: AccountTypes.CURRENT,
        number: '0001',
      }),
    );

    await service.create(
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
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'create');

      const dto: CreateAccountDTO = {
        customer: 'Cliente 3',
        type: AccountTypes.CURRENT,
        number: '0003',
      };

      await sut.create(dto);

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

  describe('update', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'update');

      const dto: UpdateAccountDTO = {
        customer: 'Cliente 1',
        number: '0001',
      };

      await sut.update('1', dto);

      expect(spy).toBeCalledWith(dto, '1');
    });
  });

  describe('delete', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'delete');

      await sut.delete('1');

      expect(spy).toBeCalledWith('1');
    });
  });

  describe('recover', () => {
    it('Should call service with correct params', async () => {
      const spy: jest.SpyInstance = jest.spyOn(service, 'recover');

      await sut.recover('1');

      expect(spy).toBeCalledWith('1');
    });
  });
});
