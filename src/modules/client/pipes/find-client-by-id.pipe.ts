import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { throwNotFound } from 'src/common/global/errors/handle-not-found';
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
      throwNotFound('Client not found in database');
      return false;
    }

    // return true;
  }
}
