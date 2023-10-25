import { Injectable } from '@nestjs/common';
import { Account, AccountsRepository } from '../../../domain';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountSchema } from '../entity-schemas/account.entity-schema';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmAccountsRepository extends AccountsRepository {
  public constructor(
    @InjectRepository(AccountSchema)
    private readonly ormRepository: Repository<Account>,
  ) {
    super();
  }

  public async find(): Promise<Account[]> {
    return this.ormRepository.find({ withDeleted: true });
  }

  public async findById(id: string): Promise<Account | null> {
    return this.ormRepository.findOne({ where: { id }, withDeleted: true });
  }

  public async findByNumber(number: string): Promise<Account | null> {
    return this.ormRepository.findOne({ where: { number }, withDeleted: true });
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }

  public async delete(account: Account): Promise<Account> {
    return this.ormRepository.softRemove(account);
  }

  public async recover(account: Account): Promise<Account> {
    return this.ormRepository.recover(account);
  }
}
