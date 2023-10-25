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

  test('Should be defined', () => {
    expect(sut).toBeDefined();
  });

  test('Should match props', () => {
    expect(sut).toMatchObject(sutProps);
  });

  test('Should correctly merge props', () => {
    const mergeProps: AccountMergeProps = {
      customer: 'Customer Test 1',
      number: '0002',
    };

    sut.mergeProps(mergeProps);

    expect(sut).toMatchObject(mergeProps);
  });

  test('Should add deposit amount to balance', () => {
    sut.deposit(100);

    expect(sut.balance).toEqual(150);
  });

  test('Should throw if deposit amount is negative or 0', () => {
    expect(() => {
      sut.deposit(-1);
    }).toThrow();

    expect(() => {
      sut.deposit(0);
    }).toThrow();
  });

  test('Should subtract withdraw amount from balance', () => {
    sut.withdraw(10);

    expect(sut.balance).toEqual(40);
  });

  test('Should throw if withdraw amount is negative or 0', () => {
    expect(() => {
      sut.withdraw(-1);
    }).toThrow();

    expect(() => {
      sut.withdraw(0);
    }).toThrow();
  });

  test('Should throw if withdraw amount is greater than balance', () => {
    expect(() => {
      sut.withdraw(60);
    }).toThrow();
  });
});
