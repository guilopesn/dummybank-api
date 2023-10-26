import { Account } from '../entities';
import { AccountsRepository } from './accounts-repository.class';

export class AccountsRepositoryMock extends AccountsRepository {
  private accounts: Account[] = [];

  public async find(): Promise<Account[]> {
    return Promise.resolve(this.accounts);
  }

  public async findById(id: string): Promise<Account | null> {
    return Promise.resolve(
      this.accounts.find((curAccount: Account) => curAccount.id === id) ?? null,
    );
  }

  public async findByNumber(number: string): Promise<Account | null> {
    return Promise.resolve(
      this.accounts.find(
        (curAccount: Account) => curAccount.number === number,
      ) ?? null,
    );
  }

  public async save(account: Account): Promise<Account> {
    if (account.id) {
      const idx: number = this.accounts.findIndex(
        (curAccount: Account) => curAccount.id === account.id,
      );

      account.updatedAt = new Date();

      this.accounts[idx] = account;
    } else {
      account.id = String(this.accounts.length + 1);
      account.createdAt = new Date();

      this.accounts.push(account);
    }

    return Promise.resolve(account);
  }

  public async saveMany(accounts: Account[]): Promise<Account[]> {
    return Promise.all(
      accounts.map(async (curAccount: Account) => this.save(curAccount)),
    );
  }

  public async delete(account: Account): Promise<Account> {
    const idx: number = this.accounts.findIndex(
      (curAccount: Account) => curAccount.id === account.id,
    );

    account.updatedAt = new Date();
    account.deletedAt = new Date();

    this.accounts[idx] = account;

    return Promise.resolve(account);
  }

  public async recover(account: Account): Promise<Account> {
    const idx: number = this.accounts.findIndex(
      (curAccount: Account) => curAccount.id === account.id,
    );

    account.updatedAt = new Date();
    account.deletedAt = null;

    this.accounts[idx] = account;

    return Promise.resolve(account);
  }
}
