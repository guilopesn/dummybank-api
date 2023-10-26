import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  DepositTransactionDTO,
  PixTransactionDTO,
  TransactionsService,
  WithdrawTransactionDTO,
} from '../../application';
import { Transaction } from '../../domain';

@ApiTags('Transações')
@Controller({ path: 'transactions' })
export class TransactionsController {
  public constructor(private readonly service: TransactionsService) {}

  @ApiOperation({ summary: 'Realizar um depósito' })
  @ApiCreatedResponse({ description: 'Depósito realizado' })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta de destino inexistente' })
  @Post('deposit')
  public async deposit(@Body() dto: DepositTransactionDTO): Promise<void> {
    await this.service.deposit(dto);
  }

  @ApiOperation({ summary: 'Realizar um saque' })
  @ApiCreatedResponse({ description: 'Saque realizado' })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta de origem inexistente' })
  @Post('withdraw')
  public async withdraw(@Body() dto: WithdrawTransactionDTO): Promise<void> {
    await this.service.withdraw(dto);
  }

  @ApiOperation({ summary: 'Realizar um PIX' })
  @ApiCreatedResponse({ description: 'PIX realizado' })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({
    description: 'Conta(s) de origem e/ou destino inexistente(s)',
  })
  @Post('pix')
  public async pix(@Body() dto: PixTransactionDTO): Promise<Transaction> {
    return this.service.pix(dto);
  }

  @ApiOperation({ summary: 'Listar transações' })
  @ApiOkResponse({
    description: 'Transações encontradas',
    type: Transaction,
    isArray: true,
  })
  @Get()
  public async getAll(): Promise<Transaction[]> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Buscar uma transação pelo ID' })
  @ApiOkResponse({ description: 'Transação encontrada', type: Transaction })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Transação inexistente' })
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Transaction> {
    return this.service.getById(id);
  }
}
