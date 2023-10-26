import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class WithdrawTransactionDTO {
  @ApiProperty({ title: 'ID da conta de origem', format: 'UUIDv4' })
  @IsUUID(undefined, { message: 'ID da conta de origem deve ser um UUIDv4' })
  public readonly fromId: string;

  @ApiProperty({ title: 'Quantia', format: '0.00', example: 0.01 })
  @IsNumber(undefined, { message: 'Quantia deve ser um número' })
  public readonly amount: number;
}
