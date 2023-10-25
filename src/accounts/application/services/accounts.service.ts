import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account, AccountsRepository } from '../../domain';
import { CreateAccountDTO, UpdateAccountDTO } from '../dtos';

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

  public async getAll(): Promise<Account[]> {
    return this.repository.find();
  }

  public async getById(id: string): Promise<Account> {
    const account: Account | null = await this.repository.findById(id);

    if (!account) {
      throw new NotFoundException(`Conta não encontrada pelo ID: ${id}`);
    }

    return account;
  }

  public async getByNumber(number: string): Promise<Account> {
    const account: Account | null = await this.repository.findByNumber(number);

    if (!account) {
      throw new NotFoundException(
        `Conta não encontrada pelo número: ${number}`,
      );
    }

    return account;
  }

  public async update(dto: UpdateAccountDTO, id: string): Promise<Account> {
    const account: Account = await this.getById(id);

    account.mergeProps(dto);

    return this.repository.save(account);
  }

  public async delete(id: string): Promise<Account> {
    const account: Account = await this.getById(id);

    return this.repository.delete(account);
  }
}
