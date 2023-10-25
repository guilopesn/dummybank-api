import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../../domain';

@Injectable()
export class AccountsService {
  public constructor(private readonly repository: AccountsRepository) {}
}
