import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { AccountTypes } from '../enums';
import { Account, AccountMergeProps, AccountProps } from './account.entity';

describe('Account', () => {
  const sutProps: AccountProps = {
    customer: 'Customer 1',
    type: AccountTypes.CURRENT,
    number: '0001',
  };

  let sut: Account;

  beforeEach(() => {
    sut = new Account(sutProps);

    sut.deposit(50);
  });

  describe('constructor', () => {
    it('Should be defined', () => {
      expect(sut).toBeDefined();
    });

    it('Should match props', () => {
      expect(sut).toMatchObject(sutProps);
    });
  });

  describe('mergeProps', () => {
    it('Should correctly merge props', () => {
      const mergeProps: AccountMergeProps = {
        customer: 'Customer it 1',
        number: '0002',
      };

      sut.mergeProps(mergeProps);

      expect(sut).toMatchObject(mergeProps);
    });
  });

  describe('deposit', () => {
    it('Should add amount to balance', () => {
      sut.deposit(100);

      expect(sut.balance).toEqual(150);
    });

    it('Should throw BadRequestException when amount is negative or 0', () => {
      expect(() => {
        sut.deposit(-1);
      }).toThrow(BadRequestException);

      expect(() => {
        sut.deposit(0);
      }).toThrow(BadRequestException);
    });

    it('Should throw ForbiddenException on deleted account', () => {
      sut.deletedAt = new Date();

      expect(() => {
        sut.deposit(10);
      }).toThrow(ForbiddenException);
    });
  });

  describe('withdraw', () => {
    it('Should subtract amount from balance', () => {
      sut.withdraw(10);

      expect(sut.balance).toEqual(40);
    });

    it('Should throw BadRequestException when amount is negative or 0', () => {
      expect(() => {
        sut.withdraw(-1);
      }).toThrow();

      expect(() => {
        sut.withdraw(0);
      }).toThrow(BadRequestException);
    });

    it('Should throw BadRequestException when amount is greater than balance', () => {
      expect(() => {
        sut.withdraw(60);
      }).toThrow(BadRequestException);
    });

    it('Should throw ForbiddenException on deleted account', () => {
      sut.deletedAt = new Date();

      expect(() => {
        sut.withdraw(10);
      }).toThrow(ForbiddenException);
    });
  });
});
