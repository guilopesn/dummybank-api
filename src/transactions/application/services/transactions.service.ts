import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, AccountsService } from '../../../accounts';
import {
  Transaction,
  TransactionTypes,
  TransactionsRepository,
} from '../../domain';
import {
  DepositTransactionDTO,
  PixTransactionDTO,
  WithdrawTransactionDTO,
} from '../dtos';

@Injectable()
export class TransactionsService {
  public constructor(
    private readonly accountsService: AccountsService,
    private readonly repository: TransactionsRepository,
  ) {}

  public async deposit(dto: DepositTransactionDTO): Promise<Transaction> {
    const to: Account = await this.accountsService.getById(dto.toId);

    const transaction: Transaction = new Transaction({
      type: TransactionTypes.DEPOSIT,
      to,
      amount: dto.amount,
    });

    const withinTransaction = async (): Promise<void> => {
      await this.accountsService.deposit(dto.amount, to.id);
    };

    return this.repository.save(transaction, withinTransaction);
  }

  public async withdraw(dto: WithdrawTransactionDTO): Promise<Transaction> {
    const from: Account = await this.accountsService.getById(dto.fromId);

    const transaction: Transaction = new Transaction({
      type: TransactionTypes.WITHDRAW,
      from,
      amount: dto.amount,
    });

    const withinTransaction = async (): Promise<void> => {
      await this.accountsService.withdraw(dto.amount, from.id);
    };

    return this.repository.save(transaction, withinTransaction);
  }

  public async pix(dto: PixTransactionDTO): Promise<Transaction> {
    const [from, to]: Account[] = await this.accountsService.getManyByIds([
      dto.fromId,
      dto.toId,
    ]);

    const transaction: Transaction = new Transaction({
      type: TransactionTypes.PIX,
      from,
      to,
      amount: dto.amount,
    });

    const withinTransaction = async (): Promise<void> => {
      await this.accountsService.pix(dto.amount, from.id, to.id);
    };

    return this.repository.save(transaction, withinTransaction);
  }

  public async getAll(): Promise<Transaction[]> {
    return this.repository.find();
  }

  public async getById(id: string): Promise<Transaction> {
    const transaction: Transaction | null = await this.repository.findById(id);

    if (!transaction) {
      throw new NotFoundException(`Transação não encontrada pelo ID: ${id}`);
    }

    return transaction;
  }
}
