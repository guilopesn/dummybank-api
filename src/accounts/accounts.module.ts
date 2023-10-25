import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSchema, TypeOrmAccountsRepository } from './infrastructure';
import { AccountsRepository } from './domain';
import { AccountsService } from './application';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
  controllers: [],
  providers: [
    { provide: AccountsRepository, useClass: TypeOrmAccountsRepository },
    AccountsService,
  ],
  exports: [TypeOrmModule],
})
export class AccountsModule {}
