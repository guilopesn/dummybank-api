import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AccountTypes } from '../enums';

export interface AccountProps {
  customer: string;

  type: AccountTypes;

  number: string;
}

export interface AccountMergeProps {
  customer?: string;

  number?: string;
}

export class Account {
  @ApiProperty({ title: 'ID', format: 'UUIDv4' })
  public id: string;

  @ApiProperty({ title: 'Cliente' })
  public customer: string;

  @ApiProperty({ title: 'Tipo', enum: AccountTypes })
  public type: AccountTypes;

  @ApiProperty({ title: 'Número' })
  public number: string;

  @ApiProperty({ title: 'Saldo', format: '0.00' })
  public balance: number;

  @ApiProperty({ title: 'Criada em' })
  public createdAt: Date;

  @ApiProperty({ title: 'Atualizada em', type: Date, nullable: true })
  public updatedAt: Date | null;

  @ApiProperty({ title: 'Deletada em', type: Date, nullable: true })
  public deletedAt: Date | null;

  public constructor(props?: AccountProps) {
    if (props) {
      this.customer = props.customer;

      this.type = props.type;

      this.number = props.number;
    }

    this.balance = 0;
  }

  public mergeProps(props: AccountMergeProps): void {
    if (props.customer) this.customer = props.customer;

    if (props.number) this.number = props.number;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new BadRequestException(`A quantia deve ser superior a 0`);
    }

    if (this.deletedAt) {
      throw new ForbiddenException(
        `Você não pode fazer transações em contas desativadas`,
      );
    }

    this.balance = this.balance + amount;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new BadRequestException(`A quantia deve ser superior a 0`);
    }

    if (amount > this.balance) {
      throw new BadRequestException(`Saldo insuficiente`);
    }

    if (this.deletedAt) {
      throw new ForbiddenException(
        `Você não pode fazer transações em contas desativadas`,
      );
    }

    this.balance = this.balance - amount;
  }
}
