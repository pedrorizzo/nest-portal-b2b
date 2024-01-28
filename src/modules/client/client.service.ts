import { ClientRepository } from './../../data/dababase/repositories/client.repository';
import { Injectable } from '@nestjs/common';
import { ClientServiceContract } from './contract/client-service-contract';
import { FindClientResponseDto } from './contract/dto/response/find-client.response';
import { FindClientRequestDto } from './contract/dto/request/find-client.request';
import { handleNotFound } from 'src/common/global/errors/handle-not-found';

@Injectable()
export class ClientService implements ClientServiceContract {
  constructor(private clientRepository: ClientRepository) {}

  async findClient(
    params: FindClientRequestDto,
  ): Promise<FindClientResponseDto> {
    const client = await this.clientRepository.findByPrimaryKey(params.id);
    if (!client) {
      handleNotFound('Client not found');
    }
    return FindClientResponseDto.fromObject(client);
  }
}
