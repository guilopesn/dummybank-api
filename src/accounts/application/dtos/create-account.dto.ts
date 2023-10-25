import { ApiProperty } from '@nestjs/swagger';
import { AccountTypes } from '../../domain';
import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAccountDTO {
  @ApiProperty({ title: 'Cliente' })
  @IsNotEmpty({ message: 'Cliente não pode ser vazio' })
  public readonly customer: string;

  @ApiProperty({ title: 'Tipo', enum: AccountTypes })
  @IsEnum(AccountTypes, {
    message: `Tipo deve ser um destes valores: ${JSON.stringify(
      Object.values(AccountTypes),
    )}`,
  })
  public readonly type: AccountTypes;

  @ApiProperty({ title: 'Número' })
  @IsNumberString(undefined, { message: 'Número deve ser um número' })
  public readonly number: string;
}
