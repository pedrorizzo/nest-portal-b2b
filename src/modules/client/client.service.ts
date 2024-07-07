import { *ascsv } from 'csv-parser';
import { ClientRepository } from '../../data/dababase/repositories/client/client.repository';
import { Injectable } from '@nestjs/common';
import { ClientServiceContract } from './contract/client-service-contract';
import { FindClientResponseDto } from './contract/dto/response/find-client.response';
import { FindClientRequestDto } from './contract/dto/request/find-client.request';
import { handleNotFound } from 'src/common/global/errors/handle-not-found';
import { CreateClientRequestDto } from './contract/dto/request/create-client.request';
import { CreateClientResponseDto } from './contract/dto/response/create-client.response';
import { ClientEntity } from 'src/data/dababase/entities';

@Injectable()
export class ClientService implements ClientServiceContract {
  constructor(private clientRepository: ClientRepository) {}

  async findClient(
    params: FindClientRequestDto,
  ): Promise<FindClientResponseDto> {
    const transactionManager = this.clientRepository.createTransactionManager();

    transactionManager.start();

    try {
      const client = await this.clientRepository.findByPrimaryKey(params.id);
      if (!client) {
        handleNotFound('Client not found');
      }

      transactionManager.commit();
      return FindClientResponseDto.fromObject(client);
    } catch (err) {
      transactionManager.rollback();
    } finally {
      transactionManager.release();
    }
  }

  async createClient(
    params: CreateClientRequestDto,
  ): Promise<CreateClientResponseDto> {
    const transactionManager = this.clientRepository.createTransactionManager();
    transactionManager.start();

    try {
      const clientWithCriteria = await this.clientRepository.findOr<ClientEntity[]>([
        {
          email: params.email
        },
        {
          document: params.document
        }
      ]);

      if (clientWithCriteria) {
        throw { message: 'Client already exists' };
      }

      const instance = params.toInstance();
      const client = await this.clientRepository.save(instance);
      transactionManager.commit();
      return CreateClientResponseDto.toDto(client);
    } catch (err) {
      transactionManager.rollback();
    } finally {
      transactionManager.release();
    }
  }
}
