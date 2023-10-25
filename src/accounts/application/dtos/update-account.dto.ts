import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class UpdateAccountDTO {
  @ApiPropertyOptional({ title: 'Cliente' })
  @IsOptional()
  @IsNotEmpty({ message: 'Cliente não pode ser vazio' })
  public readonly customer?: string;

  @ApiPropertyOptional({ title: 'Número' })
  @IsOptional()
  @IsNumberString(undefined, { message: 'Número deve ser um número' })
  public readonly number?: string;
}
