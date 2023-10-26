import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../../../accounts';
import { TransactionTypes } from '../enums';

export interface TransactionProps {
  type: TransactionTypes;

  from?: Account;

  to?: Account;

  amount: number;
}

export class Transaction {
  @ApiProperty({ title: 'ID', format: 'UUIDv4' })
  public id: string;

  @ApiProperty({ title: 'Tipo', enum: TransactionTypes })
  public type: TransactionTypes;

  @ApiProperty({ title: 'De', type: Account, nullable: true })
  public from: Account | null;

  @ApiProperty({ title: 'Para', type: Account, nullable: true })
  public to: Account | null;

  @ApiProperty({ title: 'Valor' })
  public amount: number;

  @ApiProperty({ title: 'Data/Hora' })
  public atDate: Date;

  public constructor(props?: TransactionProps) {
    if (props) {
      this.type = props.type;

      if (props.from) this.from = props.from;

      if (props.to) this.to = props.to;

      this.amount = props.amount;
    }
  }
}
