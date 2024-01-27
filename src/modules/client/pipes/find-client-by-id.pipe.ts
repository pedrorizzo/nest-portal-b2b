import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { handleNotFound } from 'src/common/global/errors';
import { BaseValidationPipe } from 'src/common/pipes/base-validation.pipe';
import { ClientRepository } from 'src/data/dababase/repositories/client.repository';

@Injectable({ scope: Scope.REQUEST })
export class FindClientByIdPipe extends BaseValidationPipe {
  constructor(
    @Inject(REQUEST) protected request: Request,
    private clientRepository: ClientRepository,
  ) {
    super(request, false);
  }

  async validate(param: any) {
    const client = await this.clientRepository.findByPrimaryKey(param.id);

    if (!client) {
      handleNotFound('Client not found in database');
      return false;
    }

    return true;
  }
}
