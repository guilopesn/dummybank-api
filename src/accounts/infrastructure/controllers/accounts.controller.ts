import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AccountsService,
  CreateAccountDTO,
  UpdateAccountDTO,
} from '../../application';
import { Account } from '../../domain';

@ApiTags('Contas')
@Controller({ path: 'accounts' })
export class AccountsController {
  public constructor(private readonly service: AccountsService) {}

  @ApiOperation({ summary: 'Criar uma conta' })
  @ApiCreatedResponse({ description: 'Conta criada', type: Account })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @Post()
  public async create(@Body() dto: CreateAccountDTO): Promise<Account> {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Listar contas' })
  @ApiOkResponse({
    description: 'Contas encontradas',
    type: Account,
    isArray: true,
  })
  @Get()
  public async getAll(): Promise<Account[]> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Buscar uma conta pelo ID' })
  @ApiOkResponse({ description: 'Conta encontrada', type: Account })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta inexistente' })
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Account> {
    return this.service.getById(id);
  }

  @ApiOperation({ summary: 'Atualizar uma conta' })
  @ApiOkResponse({ description: 'Conta atualizada', type: Account })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta inexistente' })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateAccountDTO,
  ): Promise<Account> {
    return this.service.update(dto, id);
  }

  @ApiOperation({ summary: 'Deletar uma conta' })
  @ApiOkResponse({ description: 'Conta deletada', type: Account })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta inexistente' })
  @Delete(':id')
  public async delete(id: string): Promise<Account> {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: 'Recuperar uma conta deletada' })
  @ApiOkResponse({ description: 'Conta recuperada', type: Account })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  @ApiNotFoundResponse({ description: 'Conta inexistente' })
  @Patch(':id/recover')
  public async recover(id: string): Promise<Account> {
    return this.service.recover(id);
  }
}
