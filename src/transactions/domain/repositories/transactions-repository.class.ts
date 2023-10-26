import { Transaction } from '../entities';

export abstract class TransactionsRepository {
  public abstract find(): Promise<Transaction[]>;

  public abstract findById(id: string): Promise<Transaction | null>;

  public abstract save(
    transaction: Transaction,
    withinTransaction?: () => Promise<void>,
  ): Promise<Transaction>;
}
