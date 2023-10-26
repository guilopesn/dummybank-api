import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class DepositTransactionDTO {
  @ApiProperty({ title: 'ID da conta de destino', format: 'UUIDv4' })
  @IsUUID(undefined, { message: 'ID da conta de destino deve ser um UUIDv4' })
  public readonly toId: string;

  @ApiProperty({ title: 'Quantia', format: '0.00', example: 0.01 })
  @IsNumber(undefined, { message: 'Quantia deve ser um número' })
  public readonly amount: number;
}
