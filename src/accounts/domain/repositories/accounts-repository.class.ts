import { Account } from '../entities';

export abstract class AccountsRepository {
  public abstract find(): Promise<Account[]>;

  public abstract findById(id: string): Promise<Account | null>;

  public abstract findByNumber(number: string): Promise<Account | null>;

  public abstract save(account: Account): Promise<Account>;

  public abstract delete(account: Account): Promise<Account>;

  public abstract recover(account: Account): Promise<Account>;
}
