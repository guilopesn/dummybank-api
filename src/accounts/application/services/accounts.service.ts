import { BadRequestException, Injectable } from '@nestjs/common';
import { Account, AccountsRepository } from '../../domain';
import { CreateAccountDTO } from '../dtos';

@Injectable()
export class AccountsService {
  public constructor(private readonly repository: AccountsRepository) {}

  public async create(dto: CreateAccountDTO): Promise<Account> {
    if (await this.repository.findByNumber(dto.number)) {
      throw new BadRequestException(`Já existe uma conta com este número`);
    }

    const account: Account = new Account(dto);

    return this.repository.save(account);
  }
}
