import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './application';
import { TransactionsRepository } from './domain';
import {
  TransactionSchema,
  TransactionsController,
  TypeOrmTransactionsRepository,
} from './infrastructure';
import { AccountsModule } from '../accounts';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionSchema]), AccountsModule],
  controllers: [TransactionsController],
  providers: [
    {
      provide: TransactionsRepository,
      useClass: TypeOrmTransactionsRepository,
    },
    TransactionsService,
  ],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
