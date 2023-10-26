import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Account, AccountsRepository } from '../../../domain';

@Injectable()
export class TypeOrmAccountsRepository extends AccountsRepository {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super();
  }

  public async find(): Promise<Account[]> {
    return this.entityManager.find(Account, { withDeleted: true });
  }

  public async findById(id: string): Promise<Account | null> {
    return this.entityManager.findOne(Account, {
      where: { id },
      withDeleted: true,
    });
  }

  public async findByNumber(number: string): Promise<Account | null> {
    return this.entityManager.findOne(Account, {
      where: { number },
      withDeleted: true,
    });
  }

  public async save(account: Account): Promise<Account> {
    return this.entityManager.save(account);
  }

  public async saveMany(accounts: Account[]): Promise<Account[]> {
    return this.entityManager.save(accounts);
  }

  public async delete(account: Account): Promise<Account> {
    return this.entityManager.softRemove(account);
  }

  public async recover(account: Account): Promise<Account> {
    return this.entityManager.recover(account);
  }
}
