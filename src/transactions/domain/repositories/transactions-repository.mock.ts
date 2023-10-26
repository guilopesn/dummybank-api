import { Transaction } from '../entities';
import { TransactionsRepository } from './transactions-repository.class';

export class TransactionsRepositoryMock extends TransactionsRepository {
  private transactions: Transaction[] = [];

  public constructor() {
    super();
  }

  public async find(): Promise<Transaction[]> {
    return Promise.resolve(this.transactions);
  }

  public async findById(id: string): Promise<Transaction | null> {
    return Promise.resolve(
      this.transactions.find(
        (curTransaction: Transaction) => curTransaction.id === id,
      ) ?? null,
    );
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    transaction.id = String(this.transactions.length + 1);
    transaction.atDate = new Date();

    this.transactions.push(transaction);

    return Promise.resolve(transaction);
  }
}
