import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Transaction, TransactionsRepository } from '../../../domain';

@Injectable()
export class TypeOrmTransactionsRepository extends TransactionsRepository {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super();
  }

  public async find(): Promise<Transaction[]> {
    return this.entityManager.find(Transaction, {
      relations: {
        from: true,
        to: true,
      },
      withDeleted: true,
    });
  }

  public async findById(id: string): Promise<Transaction | null> {
    return this.entityManager.findOne(Transaction, {
      where: { id },
      relations: {
        from: true,
        to: true,
      },
      withDeleted: true,
    });
  }

  public async save(
    transaction: Transaction,
    withinTransaction: () => Promise<void> = async (): Promise<void> =>
      Promise.resolve(),
  ): Promise<Transaction> {
    return this.entityManager.transaction(
      async (transactionalManager: EntityManager) => {
        const savedTransaction: Transaction =
          await transactionalManager.save(transaction);

        await withinTransaction();

        return savedTransaction;
      },
    );
  }
}
