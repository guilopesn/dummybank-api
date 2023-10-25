import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './application';
import { AccountsRepository } from './domain';
import {
  AccountSchema,
  AccountsController,
  TypeOrmAccountsRepository,
} from './infrastructure';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  controllers: [AccountsController],
  providers: [
    { provide: AccountsRepository, useClass: TypeOrmAccountsRepository },
    AccountsService,
  ],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
