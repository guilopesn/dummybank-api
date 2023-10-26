import { Account, AccountTypes } from '../../../accounts';
import { TransactionTypes } from '../enums';
import { Transaction, TransactionProps } from './transaction.entity';

describe('Transaction', () => {
  const sutProps: TransactionProps = {
    type: TransactionTypes.DEPOSIT,
    from: new Account({
      customer: 'Customer 1',
      type: AccountTypes.CURRENT,
      number: '0001',
    }),
    to: new Account({
      customer: 'Customer 2',
      type: AccountTypes.CURRENT,
      number: '0002',
    }),
    amount: 10.3,
  };

  let sut: Transaction;

  beforeEach(() => {
    sut = new Transaction(sutProps);
  });

  describe('constructor', () => {
    test('Should be defined', () => {
      expect(sut).toBeDefined();
    });

    test('Should match props', () => {
      expect(sut).toMatchObject(sutProps);
    });
  });
});
